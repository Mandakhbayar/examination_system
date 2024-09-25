import Alert from "@/components/ui/alert";
import axiosInterceptorInstance from "@/config/api-interceptor";
import { AlertType, DialogDetailType, Lesson } from "@/utils/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@/styles/auth.module.css";
import CustomButton from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ErrorStrings } from "@/utils/strings";
import { Constants } from "../../../utils/constants";
import Dialog from "@/components/ui/dialog";

interface LessonCardProps {
  lesson: Lesson | null;
  onSave?: () => void;
}

export default function EditLessonView({ lesson, onSave }: LessonCardProps) {
  const { register, handleSubmit } = useForm<Lesson>({
    defaultValues: {
      title: lesson?.title,
      description: lesson?.description,
    },
  });
  const [message, setMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<AlertType | undefined>("error");
  const [dialog, setDialog] = useState<DialogDetailType | null>(null);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(
    lesson?.image_url ?? null
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const onSubmit = async (data: Lesson) => {
    setMessage(null);
    const formData = new FormData();

    if (!lesson?.image_url && !selectedImage) {
      setMessage("Please upload an image");
      setAlertType("error");
      return;
    }

    if (lesson?.id) {
      formData.append("id", lesson.id);
    }
    if (lesson?.image_url) {
      formData.append("image_url", lesson.image_url);
    }
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (selectedImage && selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await axiosInterceptorInstance.post(`/admin/lessons`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Lesson updated successfully");
      setAlertType("success");
      onSave && onSave();
    } catch (error) {
      console.error("Error updating lesson", error);
      setMessage(ErrorStrings.SERVER_INTERNAL_ERROR);
      setAlertType("error");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      const file = e.target.files[0];

      if (!file) {
        setImageError("Please upload an image");
        return;
      }
      const { type } = file;
      if (!Constants.ACCEPTED_IMAGE_TYPES.includes(type)) {
        setImageError("Accepted types [.jpg, .jpeg, .png, svg, webp]");
        return;
      }
      reader.onload = () => {
        setSelectedImage(file);
        setImageUrl(URL.createObjectURL(file));
      };

      reader.readAsDataURL(file);
    }
  };

  const onDelete = async () => {
    setMessage(null);
    if (lesson?.id == null) {
      setMessage("Lesson ID is required");
      setAlertType("error");
      return;
    }
    try {
      await axiosInterceptorInstance.delete(`/admin/lessons/${lesson?.id}`, {
        params: {
          id: lesson?.id,
        },
      });
      setMessage("Lesson Deleted Successfully");
      setAlertType("success");
      router.push("/admin/lessons");
    } catch (error) {
      console.error("Error updating lesson", error);
      setMessage(ErrorStrings.SERVER_INTERNAL_ERROR);
      setAlertType("error");
    }
  };

  const handleOnDelete = () => {
    setDialog({
      type: "info",
      message: "Are you sure you want to delete this lesson?",
      onClose: () => {
        setDialog(null);
      },
      onComplete: () => {
        onDelete();
        setDialog(null);
      },
    });
  };

  return (
    <div className="container py-8 px-12 rounded-lg shadow-md h-min max-w-screen-md">
      {message && <Alert message={message} type={alertType} />}
      <h2 className="text-xl font-bold mb-4">Edit Lesson</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className={`${styles.input}`}
            {...register("title", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className={`${styles.input}`}
            {...register("description")}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Upload Image</label>
          <div className="mb-4">
            <input
              key={"image"}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imageError && <p className="text-red-500">{imageError}</p>}
          </div>
          {imageUrl && (
            <div className="h-60 max-w-md relative">
              <Image
                id="lesson-image"
                src={imageUrl}
                alt={lesson?.title ?? "Lesson Image"}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between gap-2">
          <CustomButton
            label="Cancel"
            styleType="default"
            onClick={() => {
              router.back();
            }}
          />
          <div className="flex gap-2">
            <CustomButton
              label="Delete"
              styleType="danger"
              onClick={handleOnDelete}
            />
            <CustomButton label="Save" styleType="next" type="submit" />
          </div>
        </div>
        {dialog && (
          <Dialog
            type={dialog.type ?? "error"}
            message={dialog.message}
            onClose={dialog.onClose}
            onComplete={dialog.onComplete}
          />
        )}
      </form>
    </div>
  );
}
