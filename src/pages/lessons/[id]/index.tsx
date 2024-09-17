import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { PageStatusType, Question } from "../../../utils/types";
import axiosInterceptorInstance from "../../../config/api-interceptor";
import QuestionCard from "../../../components/lessons/question_card";
import StartView from "../../../components/lessons/start_view";
import Timer from "../../../components/lessons/fixed_timer";
import Dialog, { DialogType } from "../../../components/ui/dialog";

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
  const [questions] = useState<Question[]>(initialQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [pageStatus, setPageStatus] = useState<PageStatusType>("start");
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [dialog, setDialog] = useState<{ type: DialogType; message: string } | null>(null);

  const showDialog = (type: DialogType, message: string) => {
    setDialog({ type, message });
  };

  const closeDialog = () => {
    setDialog(null);
  };

  useEffect(() => {
    if (pageStatus === "pending" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer); 
    }

    if (timeLeft === 0) {
      setPageStatus("finished");
    }
  }, [pageStatus, timeLeft]);

  const handleAnswerSelect = (
    questionId: number,
    answerId: number,
    isCorrect: boolean
  ) => {
    if (pageStatus === "pending") {
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
    if(questions && questions.length > 0){
      setPageStatus("pending");
      setTimeLeft(600);
    } else {
      showDialog("error", "Server internal error")
    }
  };

  if (pageStatus === "start") {
    return <>{dialog && (
      <Dialog
        type={dialog.type}
        message={dialog.message}
        onClose={closeDialog}
      />
    )}<StartView startFunction={examStart} /></>;
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
      <Timer timeLeft={timeLeft}/>
      {dialog && (
        <Dialog
          type={dialog.type}
          message={dialog.message}
          onClose={closeDialog}
        />
      )}
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
