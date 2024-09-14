interface BadgeProps {
    text: string;
    type?: 'success' | 'error' | 'warning' | 'info';
  }
  
  const Badge: React.FC<BadgeProps> = ({ text, type = 'error' }) => {
    const baseClasses = 'inline-block px-2 py-1 text-xs font-bold rounded-full text-white';
  
    const typeClasses = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
    };
  
    return <span className={`${baseClasses} ${typeClasses[type]}`}>{text}</span>;
  };
  
  export default Badge;