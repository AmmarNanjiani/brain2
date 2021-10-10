import Note from './Note';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


function SearchBar(props) {
  const [query, setQuery] = useState("")
  
  return (
    <div>
      <input placeholder="Search..."/>
    </div> 
  )
  

}

/*
  props
   - note_ids: list of ids for notes which will create the page.
*/
function NotesPage(props) {
  const [noteData, setNoteData] = useState([])
  const [noteTags, setNoteTags] = useState([])
  const [sortType, setSortType] = useState('datetime')
  const [sortDir, setSortDir] = useState('')
  const [query, setQuery] = useState('')


  useEffect(()=>{
    axios.get('/note_tag/').then(response => {
      setNoteTags(response.data)
    })    
  }, []);


  useEffect(() => {
    let getURL = `/note/?book=${props.book}`
    
    if(query !== '') {
      getURL += `&search=${query}`
    }
    
    getURL += `&ordering=${sortDir}${sortType}`

    axios.get(getURL).then(response => {
      setNoteData(response.data)
    })
  }, [query, sortType, sortDir])

  function updateNoteTags(val) {
    setNoteTags([...noteTags, val])
  }

  const toggleSortDir = () => {
    if (sortDir === ''){
      setSortDir('-')
    }
    else if (sortDir === '-'){
      setSortDir('')
    }
  }


  return  (
    <>
      <div class="flex font-sans flex-col items-center justify-items-center">
        <div class="flex space-x-4">
          <input class="border-2 border-black border-opacity-25" placeholder="Search..." onChange={e => setQuery(e.target.value)}/>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="datetime">Date/Time</option>
            <option value="chapter">Chapter</option>
          </select>
          <button onClick={toggleSortDir}>
            {(sortDir === '') ? <span>&uArr;</span> : <span>&dArr;</span>}
          </button>
        </div>
        
        {(noteData.length === 0 || noteTags.length === 0) ? <p>No results</p> : (<div>
        {
          noteData.map((data)=>{
            console.log(data)
            return <Note key={data.id} data={data} noteTags={noteTags} updateNoteTags={updateNoteTags} />;
          })
        }
        </div>)}
      </div>
    </>
  );
}

export default NotesPage;