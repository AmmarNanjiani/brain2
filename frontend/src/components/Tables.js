import Tags from './Tags';
import DataTable, { createTheme } from 'react-data-table-component';
import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";


/*
  props:
   - allTags: array of all of the book tags for tag suggestions
   - updateBookTags: function to update the book tags in parent
*/
function BooksTable(props) {
  const [bookData, setBookData] = useState([])
  const [bookTags, setBookTags] = useState([])
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  const history = useHistory()

  useEffect(() =>{

    if(loading) {
      axios.get('/book/').then(response => {
        console.log(response)
        setBookData(response.data)
      })
      
      axios.get('/author/').then(response => {
        console.log(response)
        setAuthors(response.data)
      })

      axios.get('/book_tag/').then(response => {
        console.log(response)
        setBookTags(response.data)
      })

      setLoading(false)
    }

  }, [])

  useEffect(() => {
    let getURL = `/book`

    if(query !== '') {
      getURL += `?search=${query}`
    }

    axios.get(getURL).then(response => {
      console.log(response)
      setBookData(response.data)
    })
  }, [query])

  function processAuthor(author_ids) {
    let values = []

    for(let i=0; i < author_ids.length; i++) {
      let found = authors.find(obj => obj.id === author_ids[i])
      console.log(found)
      values.push(`${found.fname} ${found.lname}`)
    }

    return values.join(" & ")
  }


  const columns = useMemo(() => [
    {
      name: "Title",
      selector: row => row.title,
      sortable: true,
      wrap: true
    },
    {
      name: "Author",
      selector: row => authors.find(obj => obj.id === row.author[0]).lname,
      format: row => processAuthor(row.author),
      sortable: true,
      wrap: true
    },
    {
      name: "Published",
      selector: row => row.published,
      sortable: true,
      wrap: true
    },
    // {
    //   name: "Tags",
    //   selector: row => processTags(row.tags),
    // },
    {
      name: "# of Notes",
      selector: row => row.notes.length,
      sortable: true,
      wrap: true
    }
  ])



  const ExpandedComponent = ({data}) => <Tags tags={data.tags} allTags={props.allTags} pid={data.id} pName={'book'} updateAllTags={props.updateBookTags}/>

  createTheme('page', {
    background: {
      default: '#FEF3C7'
    }
  }, 'light')

  return (
      <div class=" p-10 bg-yellow-100 h-screen flex font-sans flex-col items-center justify-items-center font-sm">
        <input class="border-2 border-black border-opacity-25" placeholder="Search..." onChange={e => setQuery(e.target.value)}/>
        {
          (bookTags.length === 0 || bookData.length === 0 || authors.length === 0) ? <p>No results</p> : 
            <DataTable 
              columns={columns} 
              data={bookData} 
              responsive
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              onRowClicked={(row) => history.push(`/books/${row.id}`)}
              highlightOnHover
              pointerOnHover
              theme="page"
            />
        }
      </div>

  )

}


export default BooksTable;