import axios from 'axios';
import React, {useState, useRef} from 'react';
import ContentEditable from 'react-contenteditable';
import Tags from './Tags'

function clean_string(myString) {
  let strippedHtml = myString.replace(/<[^>]+>/g, '')

  return strippedHtml
}

function Annotation(props) {
  
  const [annotation, setAnnotation] = useState(props.annotation)
  const text = useRef("")

  const handleClick = () =>{
    setAnnotation(" ")
  }

  if(!annotation || annotation == "") {

    return <div class="p-5 flex justify-center">
      <button onClick={handleClick} class="bg-gray-200 rounded-full px-2 py-2 text-base font-semibold text-gray-700 mr-2 mb-2">&#43; Add a note</button>
    </div>
  }


  text.current = annotation

  const handleChange = evt => {
    text.current = evt.target.value
  }

  const handleBlur = () => {
    if (text.current != props.annotation)
      axios.patch('/note/' + props.id + '/', {annotation : clean_string(text.current)}).then(res => {
        console.log(res)
      });
  }

  const keyPress = evt => {
    if(evt.keyCode == 13){
      evt.target.blur()
    }
  }

  return (
    <div class="p-10">
      <div class="text-gray-500">NOTE</div>
      <ContentEditable 
        html={props.annotation}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={keyPress}
      />
    </div>
    )

}

function LinkedNotes(props) {
  if(props.notes.length < 1) {
    return null
  }

  return (
    <div class="px-10">
      <div class="text-gray-500">Linked Notes</div>
      {props.notes.map(note => <div>{note.data.id}</div>)}
    </div>
  )
}

function Note(props) {

    const date = new Date(props.data.datetime);

    const [linked, setLinked] = useState([])
    const highlight = useRef(props.data.highlight)
    const chapter = useRef(props.data.chapter)

    // TODO: Add LinkedNotes functionality
    // useEffect(() => {
    //   // let linked_notes = []
    //   // let linked_notes_promises = []
    //   // for (let i = 0; i < props.data.linked_notes.length; i++) {
    //   //   linked_notes_promises.push(axios.get('/note/' + props.data.linked_notes[i]).then(response => {
    //   //     linked_notes.push(response)
    //   //   }))
    //   // }

    //   // Promise.all(linked_notes_promises).then(() => setLinked(linked_notes))

    //   // axios.get('/book/' + props.data.book).then(() => setTags)
    // }, [])

    const handleChange = evt => {
      highlight.current = evt.target.value
    }
  
    const handleBlur = () => {
      if (highlight.current != props.data.highlight)
        axios.patch('/note/' + props.data.id + '/', {highlight : clean_string(highlight.current)}).then(res => {
          console.log(res)
        });
    }

    const keyPress = evt => {
      if(evt.keyCode == 13){
        evt.target.blur()
      }
    }

    const chHandleChange = evt => {
      chapter.current = evt.target.value
    }
  
    const chHandleBlur = () => {
      if (chapter.current != props.data.chapter)
        axios.patch('/note/' + props.data.id + '/', {chapter : clean_string(chapter.current)}).then(res => {
          console.log(res)
        });
    }
    
    return (
      <>
        <div class="p-10 w-full" >  
        <div class="rounded overflow-hidden shadow-lg bg-white">
          <div class="divide-y">
            <div class="flow-root text-lg text-black px-10 py-4">
              <span class="float-left">
                <ContentEditable 
                html={props.data.chapter}
                onChange={chHandleChange}
                onBlur={chHandleBlur}
                onKeyDown={keyPress}               
                />
              </span>
              <span class="float-right">{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</span>
            </div>
            <div class="p-10">
              <p class="text-black text-base">
                <ContentEditable 
                  html={props.data.highlight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={keyPress}    
                />
              </p>
            </div>
            <Annotation annotation={props.data.annotation} id={props.data.id} />
            {/* <LinkedNotes notes={linked} /> */}
            <Tags pName="note" pid={props.data.id} tags={props.data.tags} allTags={props.noteTags} updateAllTags={props.updateNoteTags} />
          </div>
        </div>
      </div>
      </>
    );
  }

export default Note;