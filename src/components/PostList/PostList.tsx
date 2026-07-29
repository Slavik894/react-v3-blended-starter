import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

interface PostListProps {
  posts: Post[];
  editPost: (postId: Post) => void;
  editPostModal: (isEditPost:boolean)=> void;
  openModal: (isModalOpen: boolean)=> void;
}

export default function PostList({posts, editPost, editPostModal, openModal}: PostListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: ()=>{
      alert("Deleted post");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    }
    
  })

  function handeEditPost(post: Post){
    editPost(post);
    editPostModal(true);
    openModal(true);

  }

  return (
    <ul className={css.list}>
      {posts.map((post)=>
      <li key={post.id} className={css.listItem}>
        <h2 className={css.title}>{post.title}</h2>
        <p className={css.content}>{post.body}</p>
        <div className={css.footer}>
          <button className={css.edit} onClick={()=>handeEditPost(post)}>Edit</button>
          <button className={css.delete} onClick={()=>mutation.mutate(post.id)}>Delete</button>
        </div>
      </li>
      )}
      
    </ul>
  );
}
