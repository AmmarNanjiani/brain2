import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import Tags from './Tags';
import NotesPage from './NotesPage';

function Book(props) {

  const [author, setAuthor] = useState('')

  useEffect(() => {
    
    let promises = []

    for (let i=0; i < props.data.author.length; i++) {
      promises.push(axios.get('/author/' + props.data.author[i] + '/'))
    }

    Promise.all(promises).then(function(values) {
      let names = values.map((e) => e.data.fname + ' ' + e.data.lname).join()
      setAuthor(names)
    })
  }, [])

  return (
    <>
      <div class="p-10 bg-yellow-800">
        <div class="w-full rounded overflow-hidden shadow-inner bg-yellow-100">
            <div class="p-10 flex font-sans flex-col items-center justify-items-center">
              <div class="font-bold text-3xl">{props.data.title}</div>
              <div>By {author}</div>
              <div>Published on {props.data.published}</div>
              <Tags allTags={props.allTags} tags={props.data.tags} pid={props.data.id} pName={'book'} />
            </div>
            <NotesPage book={props.data.id} />
        </div>
      </div>
    </>
  )
}

export default Book;