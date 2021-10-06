import logo from './logo.svg';
import './App.css';
import Note from './components/Note';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "tailwindcss/tailwind.css"


function App() {
  const [noteData, setNoteData] = useState([])

  axios.defaults.baseURL = 'http://localhost:8000/brain2_api'

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


  return (
    <>
      {
        noteData.map((data, id)=>{
          return <Note data={data} />;
        })
      }
    </>
  );
}

export default App;
