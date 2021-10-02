import logo from './logo.svg';
import './App.css';
import Note from './components/Note';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "tailwindcss/tailwind.css"


function App() {
  const [noteData, setNoteData] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:8000/brain2_api/note/')
      .then(res=>{
        console.log(res)
        console.log(res.data);
        setNoteData(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
  }, []);

  const notes = noteData.map((data,id)=>{
    return <div key={id}>
      <h1>Book: {data.book}</h1>
      <h2>Chapter: {data.chapter}</h2>
      <div class="text-lg">Highlited Text: {data.highlight}</div>
      <div>Annotation: {data.annotation}</div>
      <div>Datetime: {data.datetime}</div>
      <div>Tags: {data.tags}</div>
      <div>Linked Notes:{data.linked_notes}</div>
      <br></br>
    </div>
  })

  return (
    <>
      {notes}
    </>
  );
}

export default App;
