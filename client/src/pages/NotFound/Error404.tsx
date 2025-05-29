import { ArrowLeft, Search } from "lucide-react";
import { Helmet } from "react-helmet";

export const Error404 = () => {

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you're looking for has gone on vacation without leaving a forwarding address." />
      </Helmet>
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Fun animated 404 number */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-secondary animate-pulse">404</h1>
          <Search className="w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 animate-bounce" />
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Oops! Looks like you've ventured into uncharted territory. The page
            you're looking for has gone on vacation without leaving a forwarding
            address.
          </p>
        </div>

        {/* Interactive buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={goBack}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary btn-primary"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-color text-base font-medium rounded-md text-secondary btn-secondary"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
};
