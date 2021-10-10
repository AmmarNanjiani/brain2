import './App.css';
import Note from './components/Note';
import Book from './components/Book';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "tailwindcss/tailwind.css"



function App() {
  axios.defaults.baseURL = 'http://localhost:8000/brain2_api'

  const [bookData, setBookData] = useState([])
  const [bookTags, setBookTags] = useState([])
  const [tagsLoading, setTagsLoading] = useState(true)
  const [bookLoading, setBookLoading] = useState(true)

  useEffect(() =>{
    axios.get('/book/4/').then(response => {
      console.log(response)
      setBookData(response.data)
      setBookLoading(false)
    })
    

    axios.get('/book_tag/').then(response => {
      console.log(response)
      setBookTags(response.data)
      setTagsLoading(false)
    })

  }, [])


  return (bookLoading || tagsLoading) ? <p>Loading...</p> : (
    <>
      <Book data={bookData} allTags={bookTags}/>
    </>
  );
}

export default App;
