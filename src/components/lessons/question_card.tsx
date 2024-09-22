import Image from "next/image";
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
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8"
    >
      <h1 className="text-2xl font-semibold mb-4 text-black">
        Question {index + 1}
      </h1>
      <h2 className="text-lg font-medium mb-6 text-gray-800">{question.text}</h2>
      
      {/* Media Section */}
      <div className="mb-6">
        {question.image && (
          <div className="mb-4">
            <Image
              src={question.image}
              alt="Question related"
              width={500}
              height={300}
              className="w-96 h-auto rounded-lg shadow-sm"
            />
          </div>
        )}
        {question.video && (
          <div className="mb-4">
            <video controls className="w-96 rounded-lg shadow-sm">
              <source src={question.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {question.audio && (
          <div className="mb-4">
            <audio controls className="w-96 rounded-lg shadow-sm">
              <source src={question.audio} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        )}
      </div>

      {/* Answer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {question.answers.map((answer, indexAnswer) => (
          <div
            key={answer.id}
            className="cursor-pointer"
            onClick={() =>
              selectFunction(question.id, answer.id, answer.isCorrect)
            }
          >
            <AnswerCard
              answer={answer}
              index={indexAnswer}
              type={
                status !== "finished"
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
