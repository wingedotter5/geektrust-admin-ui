import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

const RootBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div>
          <div>This page doesn&apos;t exist!</div>
          <p>
            Click{' '}
            <Link className="underline" to="/">
              here
            </Link>{' '}
            to go back
          </p>
        </div>
      )
    }
  }

  return <div>Something went wrong!</div>
}

export default RootBoundary
