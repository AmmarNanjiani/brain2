import './App.css';
import BooksTable from './components/Tables';
import Tags from './components/Tags';
import Book from './components/Book';
import DataTable, { createTheme } from 'react-data-table-component';
import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import "tailwindcss/tailwind.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";
import NotesPage from './components/NotesPage';


function BookPage() {
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


function App() {
  axios.defaults.baseURL = 'http://localhost:8000/brain2_api'

  const [bookTags, setBookTags] = useState([])

  useEffect(() =>{
    axios.get('/book_tag/').then(response => {
      console.log(response)
      setBookTags(response.data)
    })

  }, [])

  function updateBookTags(val) {
    setBookTags([...bookTags, val])
  }

  return (  
    <Switch>
      <Route path="/books/:book_id"><Book allTags={bookTags} updateBookTags={updateBookTags}/></Route>
      <Route path="/books"><BooksTable allTags={bookTags} updateBookTags={updateBookTags} /></Route>
      <Route path="/"><Redirect to="/books" /></Route>
    </Switch>
  )
  

}

export default App;
