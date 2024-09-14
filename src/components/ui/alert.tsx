// components/Alert.tsx

interface AlertProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
  }
  
  const Alert: React.FC<AlertProps> = ({ message, type = 'error' }) => {
    const baseClasses = 'px-4 py-3 rounded relative';
    const typeClasses = {
      success: 'bg-green-100 border-green-400 text-green-700',
      error: 'bg-red-100 border-red-400 text-red-700',
      warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
      info: 'bg-blue-100 border-blue-400 text-blue-700',
    };
  
    return (
      <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
        <strong className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}!</strong>
        <span className="block sm:inline ml-2">{message}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 5.652a1 1 0 011.415 0l.014.014a1 1 0 01.003 1.412L11.414 11l4.348 4.348a1 1 0 01-1.415 1.414l-4.348-4.348-4.348 4.348a1 1 0 01-1.414-1.414L8.586 11 4.24 6.652a1 1 0 011.415-1.414l4.348 4.348 4.348-4.348z" />
          </svg>
        </span>
      </div>
    );
  };
  
  export default Alert;
  