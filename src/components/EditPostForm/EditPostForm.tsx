import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./EditPostForm.module.css";
import { editPost } from "../../services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../types/post";

interface EditPostFormProps{
  post: Post;
  onClose: ()=> void;
}

export default function EditPostForm({post, onClose}: EditPostFormProps) {

  const valuesEdit = {
    id: post.id,
    title: post.title,
    body: post.body,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, "At least 3 characters").max(50, "Maximum length is 50 characters").required("Title is required"),
      body: Yup.string().max(500, "Maximum length is 500 characters").required("Post text is required"),
  })

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editPost,
    onSuccess: ()=>{
      alert("Post edited successfully!");
      queryClient.invalidateQueries({queryKey: ["posts"]})
      onClose();
    },

  })

  const handleSubmit = (value: Post) =>{
    mutation.mutate(value)
  }

  return (
    <Formik initialValues={valuesEdit} onSubmit={handleSubmit} validationSchema={validationSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
