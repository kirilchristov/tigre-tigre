import { Component, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    console.error('Error caught by ErrorBoundary:', error, errorInfo)

    // In production, you could send this to an error tracking service
    // e.g., Sentry, LogRocket, etc.
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

function ErrorFallback({ error }: { error: Error | null }) {
  const { t } = useTranslation()

  const handleReload = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Oops!</h1>
          <p className="text-xl text-gray-400">
            {t('error.boundary.title', 'Something went wrong')}
          </p>
        </div>

        <div className="p-4 bg-gray-900 rounded-lg text-left">
          <p className="text-sm text-gray-400 font-mono break-words">
            {error?.message || t('error.boundary.unknown', 'An unexpected error occurred')}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleReload}
            className="w-full bg-white text-black px-4 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
          >
            {t('error.boundary.reload', 'Reload Page')}
          </button>

          <p className="text-sm text-gray-500">
            {t('error.boundary.persist', 'If the problem persists, please contact support.')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary
