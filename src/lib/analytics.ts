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
    // gtag.js expects queued commands to be the original arguments object.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments)
  }

  return gtag as GtagFunction
}
