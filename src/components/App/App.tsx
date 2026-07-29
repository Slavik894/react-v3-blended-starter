import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Modal from "../Modal/Modal";
import PostForm from "../CreatePostForm/CreatePostForm";
import type { Post } from "../../types/post";
import EditPostForm from "../EditPostForm/EditPostForm";

export default function App() {

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery] = useDebounce(searchQuery, 300)

  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);

const {data} = useQuery({
  queryKey: ["posts", debouncedQuery, currentPage],
  queryFn: ()=> fetchPosts(debouncedQuery, currentPage),
  placeholderData: keepPreviousData
})
const totalPages = data?.totalCount ? Math.ceil(data?.totalCount / 8) : 0;

const handleSearch = (query: string) => {
  setCurrentPage(1);
  setSearchQuery(query)
}

function closeEditPostForm(){
    setIsModalOpen(false);
    setEditedPost(null);
    setIsEditPost(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={handleSearch}/>
        {totalPages>1 && (<Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages}/>)}
        <button className={css.button} onClick={()=> {setIsModalOpen(true); setIsCreatePost(true)}}>Create post</button>
      </header>
      {/* <Modal>Передати через children компонент CreatePostForm або EditPostForm</Modal> */}
      {isModalOpen && <Modal onClose={()=>setIsModalOpen(false)}>
        {isCreatePost && <PostForm onClose={()=>setIsModalOpen(false)}/>}
        {editedPost && isEditPost && <EditPostForm post={editedPost} onClose={closeEditPostForm}/>}
        </Modal>}
      {data && <PostList posts={data?.posts} editPost={setEditedPost} editPostModal={setIsEditPost} openModal={setIsModalOpen} />}
    </div>
  );
}
