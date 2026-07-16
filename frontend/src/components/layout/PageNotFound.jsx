import { Link } from "react-router"

export const PageNotFound = () => {
  return (
    <div className="container  mt-5">
        <div className="row">
            <h1 className="mt-5">404 Not  Found </h1>
            <p className="mb-5">We couldn’t find the page you were looking for. Visit <Link to="/" >Zerodha’s home page</Link> </p>
        </div>
    </div>
  )
}
