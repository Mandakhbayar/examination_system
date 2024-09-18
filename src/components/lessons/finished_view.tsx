import { Question, SelectedAnswer } from "../../utils/types";

interface FinishedViewProps {
  questions: Question[];
  selectedAnswers: SelectedAnswer[];
  onShowQuestionResult: () => void;
}

export default function FinishedView({
  questions,
  selectedAnswers,
  onShowQuestionResult,
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
        <div className="bg-white py-8 px-24 rounded-lg shadow-md max-h-80 mt-10 text-black">
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
          <div className="flex justify-center">
            <button
              onClick={onShowQuestionResult}
              className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Show Result Detail
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
