import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import Tags from './Tags';
import NotesPage from './NotesPage';
import { useParams } from "react-router-dom"

function Book(props) {

  const [author, setAuthor] = useState('')
  const { book_id } = useParams();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    
    if(loading) {
      axios.get(`/book/${book_id}`).then(response => {
        console.log(response)
        setData(response.data)

        let promises = []
        for (let i=0; i < response.data.author.length; i++) {
          promises.push(axios.get('/author/' + response.data.author[i] + '/'))
        }
    
        Promise.all(promises).then(function(values) {
          let names = values.map((e) => e.data.fname + ' ' + e.data.lname).join()
          setAuthor(names)
          setLoading(false)
        })
      })
    }

  }, [])

  return (
  <div class="bg-yellow-800 h-screen">
  {(loading) ? <p>No results</p> : (
    <>
      <div class="p-10 bg-yellow-800">
        <div class="w-full rounded overflow-hidden shadow-inner bg-yellow-100">
            <div class="p-10 flex font-sans flex-col items-center justify-items-center">
              <div class="font-bold text-3xl">{data.title}</div>
              <div>By {author}</div>
              <div>Published on {data.published}</div>
              <Tags allTags={props.allTags} tags={data.tags} pid={data.id} pName={'book'} updateAllTags={props.updateBookTags} />
            </div>
            <NotesPage book={data.id} />
        </div>
      </div>
    </>
  )}
  </div>
  )
}

export default Book;