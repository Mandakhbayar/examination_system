import { Question } from "@/utils/types";
import { useState } from "react";
import EditQuestionModal from "./edit_question_modal";

interface QuestionRowProps {
  id: string;
  question: Question;
  onDelete: (id: string) => void;
  fetchData: () => void;
}

export default function QuestionRow({ id, question, onDelete, fetchData }: QuestionRowProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <tr key={question.id}>
      <td className="py-2 px-4 border h-min">{question.id}</td>
      <td className="py-2 px-4 border">{question.text}</td>
      <td className="py-2 px-4 border">
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-lg"
          onClick={() => onDelete(question.id)}
        >
          Delete
        </button>
      </td>

      {isEditModalOpen && (
        <EditQuestionModal
          id={id}
          question={question}
          onClose={() => setIsEditModalOpen(false)}
          fetchData={fetchData}
        />
      )}
    </tr>
  );
}
