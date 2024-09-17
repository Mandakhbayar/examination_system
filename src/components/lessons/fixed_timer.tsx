export default function Timer({ timeLeft }: { timeLeft: number }) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const getTimeColor = () => {
    if (timeLeft > 400) return "bg-green-700";
    if (timeLeft > 300) return "bg-green-500";
    if (timeLeft > 120) return "bg-orange-300";
    if (timeLeft > 30) return "bg-orange-500";
    if (timeLeft > 10) return "bg-red-500";
    return "bg-red-700";
  };

  return (
    <div
      className={`fixed bottom-4 right-4 text-white font-bold p-3 rounded shadow-lg ${getTimeColor()}`}
    >
      Time Left: {formatTime(timeLeft)}
    </div>
  );
}
