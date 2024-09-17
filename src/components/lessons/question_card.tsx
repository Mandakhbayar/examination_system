import { PageStatusType, Question } from "../../utils/types";
import AnswerCard from "./answer_card";

export default function QuestionCard({
  question,
  index,
  selectFunction,
  isAnswerSelectedFunction,
  status,
}: {
  question: Question;
  index: number;
  selectFunction: (
    questionId: number,
    answerId: number,
    isCorrect: boolean
  ) => void;
  isAnswerSelectedFunction: (questionId: number, answerId: number) => boolean;
  status: PageStatusType;
}) {
  return (
    <div
      key={question.id}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <h1 className="text-xl font-semibold mb-4 text-black">
        Question: {index + 1}
      </h1>
      <h2 className="text-xl font-semibold mb-4 text-black">{question.text}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {question.answers.map((answer) => (
          <div
            key={answer.id}
            onClick={() =>
              selectFunction(question.id, answer.id, answer.isCorrect)
            }
          >
            <AnswerCard
              answer={answer}
              type={
                status != "finished"
                  ? isAnswerSelectedFunction(question.id, answer.id)
                    ? "selected"
                    : "default"
                  : isAnswerSelectedFunction(question.id, answer.id)
                  ? answer.isCorrect
                    ? "success"
                    : "error"
                  : answer.isCorrect
                  ? "success"
                  : "default"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
