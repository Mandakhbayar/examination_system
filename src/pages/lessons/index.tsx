import { GetServerSideProps } from 'next';
import { Lesson } from '@/utils/types';
import LessonCard from '../../components/lessons/lesson_card';
import axiosInterceptorInstance from '../../config/api-interceptor';

interface LessonsPageProps {
  lessons: Lesson[];
}

const LessonsPage: React.FC<LessonsPageProps> = ({ lessons }) => {
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Lessons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {lessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson}/>
        ))}
      </div>
    </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<LessonsPageProps> = async () => {
  const res = await axiosInterceptorInstance.get('/lessons'); 
  console.log(res.data)
  const lessons: Lesson[] = await res.data;

  return {
    props: {
      lessons,
    },
  };
};

export default LessonsPage;
