import  { useState, useEffect } from 'react';
import { Lock, AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Unauthorized() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen backGroundColor p-4">
      <Helmet>
        <title>Unauthorized Access</title>
        <meta name="description" content="You don't have permission to access this page" />
      </Helmet>
      <div 
        className={`max-w-md w-full bg-surface rounded-lg shadow-lg overflow-hidden transition-transform duration-500 ${isAnimating ? 'animate-pulse' : ''}`}
        onMouseEnter={() => setIsAnimating(false)}
        onMouseLeave={() => setIsAnimating(true)}
      >
        <div className="bg-red-500 p-6 flex justify-center">
          <Lock className="text-white w-16 h-16" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-500 mr-2" />
            <h1 className="text-2xl font-bold text-primary">Unauthorized Access</h1>
          </div>
          
          <p className="text-secondary mb-6">
            Sorry, you don't have permission to access this page. Please check your credentials or contact the administrator for access rights.
          </p>
          
          {countdown > 0 ? (
            <p className="text-sm text-secondary mb-6">
              Redirecting to home page in {countdown} seconds...
            </p>
          ) : (
            <p className="text-sm text-secondary mb-6">
              You can now navigate using the buttons below.
            </p>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleGoBack}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 btn-secondary"
            >
              <ArrowLeft size={16} />
              <span>Go Back</span>
            </button>
            
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center gap-2 px-4 py-2 btn-primary w-full"
            >
              <Home size={16} />
              <span>Go to Homepage</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-secondary text-sm">
          If you believe this is an error, please contact
          <a href="mailto:support@example.com" className="text-blue-600 hover:underline ml-1">
            support@example.com
          </a>
        </p>
      </div>
    </div>
  );
};