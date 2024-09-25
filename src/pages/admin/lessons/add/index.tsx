import { ReactElement } from "react";
import { useRouter } from "next/navigation";
import EditLessonView from "@/components/admin/lessons/edit_lesson_view";
import DashboardSidebar from "@/components/layouts/dashboard-sidebar";
import { Routes } from "@/utils/routes";

const AddLessonPage = () => {
  const router = useRouter();

  const onSaved = () => {
    router.push(Routes.admin.lessons);
  }

  return (
    <div className="container mx-auto p-4">
      <EditLessonView lesson={null} onSave={onSaved}/>
    </div>
  );
}

AddLessonPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="flex">
      <DashboardSidebar className="w-1/5" />
      <div className="w-4/5">{page}</div>
    </div>
  );
};
export default AddLessonPage
