import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import {
  Lesson,
  PageStatusType,
  Question,
  SelectedAnswer,
} from "../../../utils/types";
import axiosInterceptorInstance from "../../../config/api-interceptor";
import StartView from "../../../components/lessons/start_view";
import Timer from "../../../components/lessons/fixed_timer";
import Dialog from "../../../components/ui/dialog";
import QuestionsView from "../../../components/lessons/questions_view";
import { Constants } from "../../../utils/constants";
import FinishedView from "../../../components/lessons/finished_view";
import { DialogDetailType } from '../../../utils/types';

interface QuestionsPageProps {
  initialQuestions: Question[];
  lesson: Lesson | null;
}

export default function QuestionsPage({
  initialQuestions,
  lesson,
}: QuestionsPageProps) {
  const [questions] = useState<Question[]>(initialQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [pageStatus, setPageStatus] = useState<PageStatusType>("start");
  const [timeLeft, setTimeLeft] = useState<number>(Constants.EXAM_DEFAULT_TIME);
  const [isShowQuestionsResult, setIsShowQuestionsResult] =
    useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogDetailType | null>(null);

  useEffect(() => {
    if (pageStatus === "pending" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }

    if (timeLeft === 0) {
      handleFinish()
    }
  }, [pageStatus, timeLeft]);

  const handleFinish = () => {
    setPageStatus("finished");
  };

  const handleBack = () => {
    setDialog({type:"error", message: "test", onClose: ()=>{}})
  }

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
      setTimeLeft(Constants.EXAM_DEFAULT_TIME);
    } else {
      setDialog({type: "error", message: "Server internal error", onClose: ()=>{setDialog(null)} });
    }
  };

  const ShowQuestionResult = () => {
    setIsShowQuestionsResult(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex text-2xl  mb-6 text-black">
        Lesson: <p className="font-bold ml-2">{lesson?.title}</p>
      </h1>

      {pageStatus === "start" && <StartView startFunction={examStart} />}
      {(pageStatus === "pending" || isShowQuestionsResult == true) && (
        <>
          <QuestionsView
            questions={questions}
            isAnswerSelectedFunction={isAnswerSelected}
            status={pageStatus}
            selectFunction={handleAnswerSelect}
          />
          <Timer timeLeft={timeLeft} />
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md flex justify-between items-center">
        {/* Back Button */}
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors duration-300"
          onClick={handleBack}
        >
          Back
        </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 transition-colors duration-300"
            onClick={handleFinish}
          >
            Finish
          </button>
      </div>
        </>
      )}
      {pageStatus === "finished" && isShowQuestionsResult == false && (
        <FinishedView
          questions={questions}
          selectedAnswers={selectedAnswers}
          onShowQuestionResult={ShowQuestionResult}
        />
      )}
      {dialog && (
        <Dialog
          type={dialog.type}
          message={dialog.message}
          onClose={dialog.onClose}
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
        lesson,
      },
    };
  } catch (error) {
    console.error("Error fetching initial questions:", error);
    return {
      props: {
        initialQuestions: [],
        lesson: null,
      },
    };
  }
};
