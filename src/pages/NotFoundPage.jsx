import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
    <h1>404 Page Not Found</h1>
    <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
    <Link to="/">Back to Home</Link>
    </>
  )
}
