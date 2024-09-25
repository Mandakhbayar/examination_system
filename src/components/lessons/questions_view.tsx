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
    questionId: string,
    answerId: string,
    isCorrect: boolean
  ) => void;
  isAnswerSelectedFunction: (questionId: string, answerId: string) => boolean;
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
