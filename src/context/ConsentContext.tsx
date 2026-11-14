import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  applyConsentSideEffects,
  clearConsentRecord,
  createConsentRecord,
  DENIED_CHOICE,
  emitConsentChange,
  readConsentRecord,
  writeConsentRecord,
  type ConsentChoice,
  type ConsentRecord,
} from '@/lib/consent'
import { env } from '@/lib/env'
import { syncConsentToShopify } from '@/lib/shopify-consent'

export interface ConsentContextValue {
  record: ConsentRecord | null
  choice: ConsentChoice
  hasDecision: boolean
  bannerOpen: boolean
  isSaving: boolean
  /** Last Shopify sync result, exposed for diagnostics and documentation. */
  lastSync: ConsentRecord['sync'] | null
  openSettings: () => void
  closeBanner: () => void
  saveChoice: (choice: ConsentChoice) => Promise<void>
  withdraw: () => Promise<void>
}

const defaultContextValue: ConsentContextValue = {
  record: null,
  choice: DENIED_CHOICE,
  hasDecision: false,
  bannerOpen: false,
  isSaving: false,
  lastSync: null,
  openSettings: () => {},
  closeBanner: () => {},
  saveChoice: async () => {},
  withdraw: async () => {},
}

const ConsentContext = createContext<ConsentContextValue>(defaultContextValue)

export function useConsent(): ConsentContextValue {
  return useContext(ConsentContext)
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState<ConsentRecord | null>(() => readConsentRecord())
  const [bannerOpen, setBannerOpen] = useState<boolean>(() => readConsentRecord() === null)
  const [isSaving, setIsSaving] = useState(false)

  // Withdrawal or a denied record also clears vendor cookies left by older
  // builds. `record` is intentionally read once on mount.
  const initialRecord = useRef(record)
  useEffect(() => {
    applyConsentSideEffects(initialRecord.current)
  }, [])

  const persist = useCallback(async (choice: ConsentChoice) => {
    const next = createConsentRecord(choice)

    // Persist and gate immediately; the network handoff must never delay the
    // visitor's ability to stop tracking.
    setRecord(next)
    writeConsentRecord(next)
    applyConsentSideEffects(next)
    emitConsentChange(next)

    setIsSaving(true)
    const result = await syncConsentToShopify(choice, { timeoutMs: env.consent.syncTimeoutMs })

    const withSync: ConsentRecord = {
      ...next,
      sync: result.ok
        ? { ok: true, at: result.at }
        : { ok: false, at: Date.now(), reason: result.reason },
    }

    setRecord(withSync)
    writeConsentRecord(withSync)
    setIsSaving(false)
    setBannerOpen(false)
  }, [])

  const saveChoice = useCallback(
    async (choice: ConsentChoice) => {
      await persist({ analytics: choice.analytics === true, marketing: choice.marketing === true })
    },
    [persist]
  )

  const withdraw = useCallback(async () => {
    clearConsentRecord()
    await persist({ analytics: false, marketing: false })
  }, [persist])

  const openSettings = useCallback(() => setBannerOpen(true), [])

  const closeBanner = useCallback(() => {
    // The banner is only dismissible once a decision exists.
    if (record) setBannerOpen(false)
  }, [record])

  const value = useMemo<ConsentContextValue>(
    () => ({
      record,
      choice: record?.choice ?? DENIED_CHOICE,
      hasDecision: record !== null,
      bannerOpen,
      isSaving,
      lastSync: record?.sync ?? null,
      openSettings,
      closeBanner,
      saveChoice,
      withdraw,
    }),
    [record, bannerOpen, isSaving, openSettings, closeBanner, saveChoice, withdraw]
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}
