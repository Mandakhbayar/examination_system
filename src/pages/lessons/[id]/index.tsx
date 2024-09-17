import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { Lesson, PageStatusType, Question } from "../../../utils/types";
import axiosInterceptorInstance from "../../../config/api-interceptor";
import StartView from "../../../components/lessons/start_view";
import Timer from "../../../components/lessons/fixed_timer";
import Dialog, { DialogType } from "../../../components/ui/dialog";
import QuestionsView from "../../../components/lessons/questions_view";

interface QuestionsPageProps {
  initialQuestions: Question[];
  lesson: Lesson | null;
}

interface SelectedAnswer {
  questionId: number;
  answerId: number;
}

export default function QuestionsPage({
  initialQuestions,
  lesson
}: QuestionsPageProps) {
  const [questions] = useState<Question[]>(initialQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [pageStatus, setPageStatus] = useState<PageStatusType>("start");
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [isShowQuestionsResult, setIsShowQuestionsResult] = useState<boolean>(false);
  const [dialog, setDialog] = useState<{
    type: DialogType;
    message: string;
  } | null>(null);

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
    if (questions && questions.length > 0) {
      setPageStatus("pending");
      setTimeLeft(600);
    } else {
      showDialog("error", "Server internal error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex text-2xl  mb-6 text-black">Lesson: <p className="font-bold ml-2">{lesson?.title}</p></h1>

      {pageStatus === "start" && <StartView startFunction={examStart} />}
      {(pageStatus === "pending" || isShowQuestionsResult == true ) && (
        <QuestionsView
          questions={questions}
          isAnswerSelectedFunction={isAnswerSelected}
          status={pageStatus}
          selectFunction={handleAnswerSelect}
        />
      )}
      {(pageStatus === "finished" && isShowQuestionsResult == false) && (
        <div className="text-center text-lg font-bold">Exam Finished</div>
      )}
      <Timer timeLeft={timeLeft} />
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
    const initialQuestions: Question[] = response.data.questions;
    const lesson: Lesson = response.data.lesson;

    return {
      props: {
        initialQuestions,
        lesson
      },
    };
  } catch (error) {
    console.error("Error fetching initial questions:", error);
    return {
      props: {
        initialQuestions: [],
        lesson: null
      },
    };
  }
};
