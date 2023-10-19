"use client";

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      let response;
      if (searchText && searchText.trim() !== "") {
        response = await fetch(`/api/prompt/search/${searchText}`);
      } else {
        response = await fetch(`/api/prompt`);
      }
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, [searchText])

  return (
    <section className='feed'>
      <form
        className='relative w-full flex-container'
      >
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer'
          required
        >
        </input>
      </form>

      <PromptCardList 
        data = {posts}
        handleTagClick = {(tag) => {setSearchText(tag)}}
      />

    </section>
  )
}

export default Feed