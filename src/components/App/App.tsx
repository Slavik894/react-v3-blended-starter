import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
// import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function App() {

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery] = useDebounce(searchQuery, 300)

  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={handleSearch}/>
        {totalPages>1 && (<Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages}/>)}
        <button className={css.button}>Create post</button>
      </header>
      {/* <Modal>Передати через children компонент CreatePostForm або EditPostForm</Modal> */}
      {data && <PostList posts={data?.posts} />}
    </div>
  );
}
