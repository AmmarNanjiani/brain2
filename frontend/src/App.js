import './App.css';
import Note from './components/Note';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "tailwindcss/tailwind.css"


function App() {
  const [noteData, setNoteData] = useState([])
  const [noteTags, setNoteTags] = useState([])

  axios.defaults.baseURL = 'http://localhost:8000/brain2_api'

  useEffect(()=>{
    axios.get('/note/')
      .then(res=>{
        console.log(res)
        console.log(res.data);
        setNoteData(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    
    axios.get('/note_tag/').then(response => {
      setNoteTags(response.data)
    })    
  }, []);

  function updateNoteTags(val) {
    setNoteTags([...noteTags, val])
  }


  return (
    <>
      {
        noteData.map((data, id)=>{
          return <Note data={data} noteTags={noteTags} updateNoteTags={updateNoteTags} />;
        })
      }
    </>
  );
}

export default App;
