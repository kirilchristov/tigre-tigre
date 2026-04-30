export type GtagCommand = 'js' | 'config' | 'event' | 'set'
export type GtagFunction = (
  command: GtagCommand,
  target: string | Date,
  params?: Record<string, unknown>
) => void

export function createDataLayerGtag(dataLayer: unknown[]): GtagFunction {
  function gtag(
    _command: GtagCommand,
    _target: string | Date,
    _params?: Record<string, unknown>
  ) {
    dataLayer.push(arguments)
  }

  return gtag as GtagFunction
}
