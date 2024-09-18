import { GetServerSideProps } from "next";
import { DialogDetailType, Lesson } from "@/utils/types";
import LessonCard from "../../components/lessons/lesson_card";
import axiosInterceptorInstance from "../../config/api-interceptor";
import { useEffect, useState } from "react";
import Dialog from "../../components/ui/dialog";
import { DefaultStrings } from '../../utils/strings';

interface LessonsPageProps {
  lessons: Lesson[];
}

const LessonsPage: React.FC<LessonsPageProps> = ({ lessons }) => {
  const [dialog, setDialog] = useState<DialogDetailType | null>(null);
  // const router = useRouter();

  useEffect(()=>{
    if(!lessons || lessons.length == 0){
      setDialog({type: "error", message: DefaultStrings.LESSONS_NOT_FOUND, onClose: onCloseDialog })
    }
  },[lessons])

  const onCloseDialog = () => {
    setDialog(null);
    // router.push(Routes.private.lessons)
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-black">Lessons</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  LessonsPageProps
> = async () => {
  try {
    const res = await axiosInterceptorInstance.get("/lessons");
    const lessons: Lesson[] = await res.data;

    return {
      props: {
        lessons,
      },
    };
  } catch (error) {
    console.error("Error fetching initial questions:", error);
    return {
      props: {
        lessons: [],
      },
    };
  }
};

export default LessonsPage;
