import { useQuery } from "@tanstack/react-query";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
// import Modal from "../Modal/Modal";
// import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function App() {

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery] = useDebounce(searchQuery, 300)

const {data} = useQuery({
  queryKey: ["posts", debouncedQuery],
  queryFn: ()=> fetchPosts(debouncedQuery, 1),
})

console.log(data);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={setSearchQuery}/>
        {/* <Pagination /> */}
        <button className={css.button}>Create post</button>
      </header>
      {/* <Modal>Передати через children компонент CreatePostForm або EditPostForm</Modal> */}
      {data && <PostList posts={data} />}
    </div>
  );
}
