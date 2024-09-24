import { useForm, SubmitHandler } from "react-hook-form";
import axiosInterceptorInstance from "@/config/api-interceptor";
import { AlertType, Question } from "@/utils/types";
import CustomButton from "@/components/ui/button";
import { useState } from "react";
import Alert from "@/components/ui/alert";
import { ErrorStrings } from "@/utils/strings";

interface EditQuestionModalProps {
  id: string;
  question?: Question;
  onClose: () => void;
  fetchData: () => void;
}

export default function EditQuestionModal({
  id,
  question,
  onClose,
  fetchData
}: EditQuestionModalProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<AlertType | undefined>("error");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Question>({
    defaultValues: {
      text: question?.text,
      answers:
        question?.answers.map((answer) => ({
          id: answer.id,
          text: answer.text,
          isCorrect: answer.isCorrect || false,
        })) || Array(4).fill({ text: "", isCorrect: false }),
    },
  });

  const onSubmit: SubmitHandler<Question> = async (data) => {
    const formData = new FormData();
    setMessage(null);
    try {
      if (!data.answers || data.answers.length < 4) {
        setMessage("Please provide at least 4 answers");
        setAlertType("error");
        return;
      }

      if (question?.id) {
        formData.append("id", question.id);
      }
      if (data.text) {
        formData.append("text", data.text);
      }

      // Append files if they are selected
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      if (data.video && data.video.length > 0) {
        formData.append("video", data.video[0]);
      }
      if (data.audio && data.audio.length > 0) {
        formData.append("audio", data.audio[0]);
      }

      data.answers.forEach((answer, index) => {
        formData.append(`answers[${index}][id]`, answer.id as string);
        formData.append(`answers[${index}][text]`, answer.text);
        formData.append(
          `answers[${index}][isCorrect]`,
          String(answer.isCorrect)
        );
      });

      await axiosInterceptorInstance.post(
        `/admin/lessons/${id}/questions`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchData();
      onClose();
      reset();
    } catch (error) {
      console.error("Failed to update question", error);
      setMessage(ErrorStrings.SERVER_INTERNAL_ERROR);
      setAlertType("error");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-3xl">
        {message && <Alert message={message} type={alertType} />}
        <h2 className="text-xl font-bold mb-4">Edit Question</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Question Text */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Question Text</label>
            <input
              type="text"
              {...register("text", { required: true })}
              className="border p-2 w-full"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload Image</label>
            <input type="file" {...register("image")} />
          </div>

          {/* Video Upload */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload Video</label>
            <input type="file" {...register("video")} />
          </div>

          {/* Audio Upload */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload Audio</label>
            <input type="file" {...register("audio")} />
          </div>

          {/* Answers with isCorrect Radio Button */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Answers</label>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <label className="block font-medium mb-1 mr-2">{`${
                    index + 1
                  })`}</label>
                  <div className="flex flex-col w-full gap-2">
                    <input
                      type="text"
                      placeholder={`Answer ${index + 1}`}
                      {...register(`answers.${index}.text` as const)}
                      className="border p-2 w-full mr-2"
                    />
                    {errors.answers && errors.answers[index] && (
                      <p className="text-red-500">
                        {errors.answers[index].text?.message}
                      </p>
                    )}
                  </div>
                  <label className="mr-2 ml-2">Correct:</label>
                  <input
                    type="checkbox"
                    {...register(`answers.${index}.isCorrect`)}
                  />
                </div>
              ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <CustomButton
              styleType="default"
              label="Cancel"
              onClick={onClose}
            />
            <CustomButton styleType="next" label="Save changes" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
