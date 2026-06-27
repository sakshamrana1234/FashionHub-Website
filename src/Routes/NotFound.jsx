import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  const isMissingPage = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="route-error-page">
      <span>{isMissingPage ? "404" : "Error"}</span>
      <h1>{isMissingPage ? "Page not found" : "Something went wrong"}</h1>
      <p>
        {isMissingPage
          ? "This FashionHub page does not exist. Head back to the latest edit."
          : "The page could not load. Return home and try again."}
      </p>
      <Link to="/" className="primary-cta">Back to home</Link>
    </main>
  );
};

export default NotFound;
