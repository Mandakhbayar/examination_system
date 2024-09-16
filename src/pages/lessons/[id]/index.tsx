import { GetServerSideProps } from "next";
import { useState } from "react";
import { PageStatusType, Question } from "../../../utils/types";
import axiosInterceptorInstance from "../../../config/api-interceptor";
import QuestionCard from "../../../components/lessons/question_card";
import StartView from "../../../components/lessons/start_view";

interface QuestionsPageProps {
  initialQuestions: Question[];
}

interface SelectedAnswer {
  questionId: number;
  answerId: number;
}

export default function QuestionsPage({
  initialQuestions,
}: QuestionsPageProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [pageStatus, setPageStatus] = useState<PageStatusType>("start");

  const handleAnswerSelect = (
    questionId: number,
    answerId: number,
    isCorrect: boolean
  ) => {
    if (pageStatus == "pending") {
      setSelectedAnswers((prevSelected) => {
        const newSelected = prevSelected.filter(
          (answer) => answer.questionId !== questionId
        );
        return [...newSelected, { questionId, answerId, isCorrect }];
      });
    }
  };

  const isAnswerSelected = (questionId: number, answerId: number): boolean => {
    return selectedAnswers.some(
      (answer) =>
        answer.questionId === questionId && answer.answerId === answerId
    );
  };

  const examStart = () => {
    setPageStatus("pending");
  }

  if(pageStatus == "start") {
    return <StartView startFunction={examStart} />
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Questions</h1>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <QuestionCard
            key={index}
            index={index}
            question={question}
            selectFunction={handleAnswerSelect}
            isAnswerSelectedFunction={isAnswerSelected}
            status={pageStatus}
          />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  QuestionsPageProps
> = async (context) => {
  const { id } = context.query;
  try {
    const response = await axiosInterceptorInstance.get(`/lessons/${id}`);
    const initialQuestions: Question[] = response.data;

    return {
      props: {
        initialQuestions,
      },
    };
  } catch (error) {
    console.error("Error fetching initial questions:", error);
    return {
      props: {
        initialQuestions: [],
      },
    };
  }
};
