import { Answer } from "../../utils/types";

type Type = "success" | "error" | "warning" | "info" | "default" | "selected";
const typeClasses = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
    default: 'bg-gray-100 text-black',
    selected: 'bg-black text-white'
  };

export default function AnswerCard({answer, type="default", index}: {answer:Answer, type?: Type, index: number}) {
  return (
    <div
      key={answer.id}
      className={`p-4 rounded-lg ${typeClasses[type]} border border-gray-300 break-words whitespace-normal`}
    >
       <span className="text-lg font-bold mr-2">{String.fromCharCode(97 + index)+")"}</span>
      {answer.text}
    </div>
  );
}
