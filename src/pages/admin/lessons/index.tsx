import { DialogDetailType, Lesson } from "@/utils/types";
import LessonCard from "@/components/lessons/lesson_card";
import axiosInterceptorInstance from "@/config/api-interceptor";
import { ReactElement, useEffect, useState } from "react";
import Dialog from "@/components/ui/dialog";
import { ErrorStrings } from "@/utils/strings";
import LoadingScreen from "@/components/loading-screen";
import DashboardSidebar from "@/components/layouts/dashboard-sidebar";
import { Routes } from "@/utils/routes";
import CustomButton from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LessonsPage = () => {
  const [dialog, setDialog] = useState<DialogDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isFetch, setIsFetch] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isFetch) {
      fetchData();
    }
  }, [isFetch]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await axiosInterceptorInstance.get("/lessons");

      if (!res.data || res.data.length == 0) {
        throw new Error(ErrorStrings.DATA_NOT_FOUND);
      }
      setLessons(res.data);
      setIsFetch(false);
    } catch (error) {
      setDialog({
        type: "error",
        message: ErrorStrings.SERVER_INTERNAL_ERROR,
        onClose: onCloseDialog,
      });
    }
    setIsLoading(false);
  }

  const onCloseDialog = () => {
    setDialog(null);
    // router.push(Routes.private.lessons)
  };
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Lessons</h1>
      <CustomButton
        onClick={() => {
          router.push(Routes.admin.addLesson);
        }}
        type="button"
        styleType="next"
        label="Add Lesson"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            href={Routes.admin.lessonDetail(lesson.id)}
          />
        ))}
      </div>
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
};

LessonsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="flex">
      <DashboardSidebar className="w-1/5" />
      <div className="w-4/5">{page}</div>
    </div>
  );
};

export default LessonsPage;
