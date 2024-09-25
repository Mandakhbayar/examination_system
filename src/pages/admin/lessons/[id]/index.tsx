import { useState, useEffect, ReactElement } from "react";
import { DialogDetailType, Lesson, Question } from "@/utils/types";
import axiosInterceptorInstance from "@/config/api-interceptor";
import QuestionRow from "@/components/admin/lessons/question_row";
import LoadingScreen from "@/components/loading-screen";
import Dialog from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ErrorStrings } from "@/utils/strings";
import CustomButton from "@/components/ui/button";
import EditQuestionModal from "@/components/admin/lessons/edit_question_modal";
import EditLessonView from "@/components/admin/lessons/edit_lesson_view";
import DashboardSidebar from "@/components/layouts/dashboard-sidebar";

const AdminQuestionsPage = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState<DialogDetailType | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const id = window.location.pathname.split("/").pop();
    setId(id ?? null);
    setIsLoading(true);
    try {
      if (!id) {
        throw new Error("Query parameter 'id' is missing");
      }
      const res = await axiosInterceptorInstance.get(`/admin/lessons/${id}`);
      console.log("DATA>>" + res.data);

      if (
        !res.data ||
        !res.data.lesson
      ) {
        throw new Error(ErrorStrings.DATA_NOT_FOUND);
      }
      setQuestions(res.data.questions ?? []);
      setLesson(res.data.lesson);
    } catch (error) {
      console.log(error);
      setDialog({
        type: "error",
        message: ErrorStrings.SERVER_INTERNAL_ERROR,
        onComplete: () => {
          router.back();
        }
      });
    }
    setIsLoading(false);
  }

  const handleDeleteQuestion = async (questionId: string) => {
    setDialog({
      type: "info",
      message: "Are you sure you want to delete this question?",
      onClose: () => {
        setDialog(null);
      },
      onComplete: () => {
        deleteQuestion(questionId);
      },
    });
  };

  const deleteQuestion = async (questionId: string) => {
    try {
      await axiosInterceptorInstance.delete(`/admin/lessons/${id}/questions`, {
        params: { questionId: questionId },
      });
      setQuestions(questions.filter((q) => q.id !== questionId));
      setDialog(null);
    } catch (error) {
      console.error(error);
      setDialog({
        type: "error",
        message: "Failed to delete question.",
        onClose: () => {
          setDialog(null);
        },
      });
    }
  };

  if (isLoading || id == null) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto p-4">
      <EditLessonView lesson={lesson as Lesson} />
      <h1 className="text-2xl font-bold mb-6 text-black mt-10">Manage Questions</h1>
      {dialog && (
        <Dialog
          type={dialog.type ?? "error"}
          message={dialog.message}
          onClose={dialog.onClose}
          onComplete={dialog.onComplete}
        />
      )}

      <div className="flex justify-end mb-4">
        <CustomButton
          label="Add question"
          styleType="next"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border w-10">ID</th>
              <th className="py-2 px-4 border">Question Text</th>
              <th className="py-2 px-4 border w-48">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <QuestionRow
                key={question.id}
                id={id as string}
                question={question}
                onDelete={handleDeleteQuestion}
                fetchData={fetchData}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Question Modal */}
      {isAddModalOpen && (
        <EditQuestionModal
          id={id}
          onClose={() => setIsAddModalOpen(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}

AdminQuestionsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="flex">
      <DashboardSidebar className="w-1/5" />
      <div className="w-4/5">{page}</div>
    </div>
  );
};
export default AdminQuestionsPage
