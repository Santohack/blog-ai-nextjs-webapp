"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts , setPosts] = useState([]);
 const handleSearchTextChange = (e) => {
  setSearchText(e.target.value);
 }

 useEffect(() => {

  const fetchList = async () => {
    const res = await fetch ('api/prompt')
    const data = await res.json()
    setPosts(data)
  } 
   
  fetchList()
 },[])
 
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
         type="text" 
         className="search_input peer" 
         placeholder="Type something..."
         required
         value={searchText}
         onChange={handleSearchTextChange}
         
         />
      </form>
      <PromptCardList
      data={posts}
      handleTagClick={() => {}}
      
      />
    </section>
  );
};

export default Feed;
