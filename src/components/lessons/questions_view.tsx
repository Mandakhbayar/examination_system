import { PageStatusType, Question } from "../../utils/types";
import QuestionCard from "./question_card";

export default function QuestionsView({
  questions,
  selectFunction,
  isAnswerSelectedFunction,
  status,
}: {
  questions: Question[];
  selectFunction: (
    questionId: number,
    answerId: number,
    isCorrect: boolean
  ) => void;
  isAnswerSelectedFunction: (questionId: number, answerId: number) => boolean;
  status: PageStatusType;
}) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          index={index}
          question={question}
          selectFunction={selectFunction}
          isAnswerSelectedFunction={isAnswerSelectedFunction}
          status={status}
        />
      ))}
    </div>
  );
}
