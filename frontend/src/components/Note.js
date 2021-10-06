import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import ContentEditable from 'react-contenteditable';
import ReactDOMServer from 'react-dom/server';
import ReactTags from 'react-tag-autocomplete';


function Annotation(props) {
  if(!props.annotation) {
    return null
  }

  const text = useRef(props.annotation)

  const handleChange = evt => {
    text.current = evt.target.value
    console.log(text.current)
  }

  const handleBlur = () => {
    if (text.current != props.annotation)
      axios.patch('/note/' + props.id + '/', {annotation : text.current}).then(res => {
        console.log(res)
      });
  }

  return (
    <div class="p-10">
      <div class="text-gray-500">NOTE</div>
      <ContentEditable 
        html={props.annotation}
        onChange={handleChange}
        onBlur={handleBlur}
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

function Tag(props) {

  return <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    <ContentEditable 
      html={props.tag}
    />
  </span>
}

function Tags(props) {
  if(props.tags.length < 1){
    return null
  }
  const [tags, setTags] = useState([])

  useEffect(() => {
    let tags_promises = []
    let tags = []

    for (let i = 0; i < props.tags.length; i++) {
      tags_promises.push(axios.get('/note_tag/' + props.tags[i]).then(response => {
        tags.push(response)
      }))
    }

    Promise.all(tags_promises).then(() => setTags(tags))

    // axios.get('/book/' + props.data.book).then(() => setTags)
  }, [])

  console.log(tags)
  
  return (
    <div class="px-6 pt-4 pb-2">
      {tags.map(tag => <Tag tag={tag.data.name} />)}
    </div>
  )
}

function Note(props) {

    const date = new Date(props.data.datetime);

    const [linked, setLinked] = useState([])

    const [tags, setTags] = useState([])
    
    // useEffect(() => {
    //   // let linked_notes = []
    //   // let linked_notes_promises = []
    //   // for (let i = 0; i < props.data.linked_notes.length; i++) {
    //   //   linked_notes_promises.push(axios.get('/note/' + props.data.linked_notes[i]).then(response => {
    //   //     linked_notes.push(response)
    //   //   }))
    //   // }

    //   // Promise.all(linked_notes_promises).then(() => setLinked(linked_notes))

    //   let tags_promises = []
    //   let tags = []

    //   for (let i = 0; i < props.data.tags.length; i++) {
    //     tags_promises.push(axios.get('/note_tag/' + props.data.tags[i]).then(response => {
    //       tags.push(response)
    //     }))
    //   }

    //   Promise.all(tags_promises).then(() => setTags(tags))

    //   // axios.get('/book/' + props.data.book).then(() => setTags)
    // }, [])
    
    return (
      <>
        <div class="p-10">  
        <div class="w-full rounded overflow-hidden shadow-lg">
          <div class="divide-y">
            <div class="flow-root text-lg text-black px-10 py-4">
              <span class="float-left">{props.data.chapter}</span>
              <span class="float-right">{date.toLocaleDateString()}</span>
            </div>
            <div class="p-10">
              <p class="text-black text-base">
                {props.data.highlight}
              </p>
            </div>
            <Annotation annotation={props.data.annotation} id={props.data.id} />
            <LinkedNotes notes={linked} />
            <Tags tags={props.data.tags} />
          </div>
        </div>
      </div>
      </>
    );
  }

export default Note;