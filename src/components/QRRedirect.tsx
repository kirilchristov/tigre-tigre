import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function QrRedirect() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    if (code) {
      // Optional: store for later use on homepage
      console.log('QR Code scanned:', code)
    }

    // Let analytics record /r/:code, then redirect.
    const timer = window.setTimeout(() => {
      navigate('/', { replace: true })
    }, 200)

    return () => window.clearTimeout(timer)
  }, [code, navigate])

  return null
}
