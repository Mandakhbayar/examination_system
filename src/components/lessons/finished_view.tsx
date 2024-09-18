import { Question, SelectedAnswer } from "../../utils/types";
import CustomButton from "../ui/button";

interface FinishedViewProps {
  questions: Question[];
  selectedAnswers: SelectedAnswer[];
  onShowQuestionResult: () => void;
  onBack: () => void;
}

export default function FinishedView({
  questions,
  selectedAnswers,
  onShowQuestionResult,
  onBack
}: FinishedViewProps) {
  const correctAnswersCount = selectedAnswers.filter((answer) =>
    questions
      .find((q) => q.id === answer.questionId)
      ?.answers.find((a) => a.id === answer.answerId && a.isCorrect)
  ).length;

  const totalQuestions = questions.length;
  const selectedQuestions = selectedAnswers.length;
  const score = correctAnswersCount;
  return (
    <>
      <div className="flex justify-center min-h-screen bg-gray-100">
        <div className="bg-white py-8 px-24 rounded-lg shadow-md mt-10 h-min text-black">
          <h1 className="text-gray-500 text-3xl font-bold text-center mb-6">
            Quiz Finished!
          </h1>
          <div className="text-center">
            <h2 className="text-xl mb-4">
              <h2 className="text-xl mb-4">
                Your Answered Questions: {selectedQuestions} / {totalQuestions}
              </h2>
              Your Score: {correctAnswersCount} / {totalQuestions}
            </h2>
            <h2 className="text-2xl font-semibold mb-6">
              Points: {score} / {totalQuestions}
            </h2>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <CustomButton label="Show Result Detail" type="black" onClick={onShowQuestionResult}/>
            <CustomButton label="Home" type="white" onClick={onBack}/>
          </div>
        </div>
      </div>
    </>
  );
}
