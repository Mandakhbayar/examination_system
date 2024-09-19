import Link from "next/link";
import { Lesson } from "../../utils/types";
import Image from "next/image";
import { Routes } from "../../utils/routes";

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link href={Routes.private.questions(lesson.id)} passHref>
      <div
        key={lesson.id}
        className="bg-white border rounded-lg shadow-md overflow-hidden"
      >
        <div className="w-full h-60 object-cover relative">
          <Image
            src={lesson.image_url}
            alt={lesson.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-black mb-2">{lesson.title}</h2>
          <p className="text-gray-700 mb-4">{lesson.description}</p>
        </div>
      </div>
    </Link>
  );
}
