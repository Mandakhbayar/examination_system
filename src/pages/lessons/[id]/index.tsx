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
import { DialogDetailType } from "../../../utils/types";
import CustomButton from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { ErrorStrings } from "../../../utils/strings";
import LoadingScreen from "../../../components/loading-screen";

export default function QuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [pageStatus, setPageStatus] = useState<PageStatusType>("start");
  const [timeLeft, setTimeLeft] = useState<number>(Constants.EXAM_DEFAULT_TIME);
  const [timeTaken, setTimeTaken] = useState<number>(0); // Track the time taken
  const [isFetch, setIsFetch] = useState(true);
  const [isShowQuestionsResult, setIsShowQuestionsResult] =
    useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogDetailType | null>(null);

  useEffect(() => {
    if (isFetch) {
      fetchData();
    }
  }, [isFetch]);

  useEffect(() => {
    if (pageStatus === "pending" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }

    if (timeLeft === 0) {
      setPageStatus("finished");
      setTimeTaken(Constants.EXAM_DEFAULT_TIME - timeLeft); // Store time taken
    }
  }, [pageStatus, timeLeft]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const id = window.location.pathname.split("/").pop();
      if (!id) {
        throw new Error("Query parameter 'id' is missing");
      }
      const res = await axiosInterceptorInstance.get(`/lessons/${id}`);
      console.log("DATA>>" + res.data);

      if (
        !res.data ||
        !res.data.questions ||
        res.data.questions == 0 ||
        !res.data.lesson
      ) {
        throw new Error(ErrorStrings.DATA_NOT_FOUND);
      }
      setQuestions(res.data.questions);
      setLesson(res.data.lesson);
      setIsFetch(false);
    } catch (error) {
      console.log(error);
      setDialog({
        type: "error",
        message: ErrorStrings.SERVER_INTERNAL_ERROR,
        onClose: () => {
          router.back();
        },
      });
    }
    setIsLoading(false);
  }

  const handleFinish = () => {
    setDialog({
      type: "info",
      message: "Are you sure you want to complete the Test?",
      onClose: () => {
        setDialog(null);
      },
      onComplete: () => {
        setPageStatus("finished");
        setTimeTaken(Constants.EXAM_DEFAULT_TIME - timeLeft); // Store time taken on finish
        setDialog(null);
      },
    });
  };

  const handleResult = () => {
    setIsShowQuestionsResult(false);
  };

  const handleBack = () => {
    setDialog({
      type: "info",
      message: "Are you sure you want to go back?",
      onClose: () => {
        setDialog(null);
      },
      onComplete: () => {
        router.back();
      }
    });
  };

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

  const handleStart = () => {
    if (questions && questions.length > 0) {
      setPageStatus("pending");
      setTimeLeft(Constants.EXAM_DEFAULT_TIME);
    } else {
      setDialog({
        type: "error",
        message: "Server internal error",
        onClose: () => {
          setDialog(null);
        },
      });
    }
  };

  const ShowQuestionResult = () => {
    setIsShowQuestionsResult(true);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex text-2xl mb-6 text-black">
        Lesson: <p className="font-bold ml-2">{lesson?.title}</p>
      </h1>

      {pageStatus === "start" && <StartView startFunction={handleStart} />}
      {(pageStatus === "pending" || isShowQuestionsResult == true) && (
        <div className="pb-20">
          <QuestionsView
            questions={questions}
            isAnswerSelectedFunction={isAnswerSelected}
            status={pageStatus}
            selectFunction={handleAnswerSelect}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-80 p-4 shadow-md flex justify-between items-center">
            <CustomButton type="default" label="Back" onClick={handleBack} />
            <Timer timeLeft={timeLeft} />
            {pageStatus !== "finished" ? (
              <CustomButton
                type="success"
                label="Finish"
                onClick={handleFinish}
              />
            ) : (
              <CustomButton
                type="next"
                label="Result"
                onClick={handleResult}
              />
            )}
          </div>
        </div>
      )}
      {pageStatus === "finished" && isShowQuestionsResult == false && (
        <FinishedView
          questions={questions}
          selectedAnswers={selectedAnswers}
          onShowQuestionResult={ShowQuestionResult}
          onBack={()=>{router.back()}}
          timeTaken={timeTaken} 
        />
      )}
      {dialog && (
        <Dialog
          type={dialog.type}
          message={dialog.message}
          onClose={dialog.onClose}
          onComplete={dialog.onComplete}
        />
      )}
    </div>
  );
}
