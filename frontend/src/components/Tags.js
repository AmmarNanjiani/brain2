import React, {useState, useEffect, useCallback} from 'react';
import ReactTags from 'react-tag-autocomplete';
import axios from 'axios';
import "./tag-styles.css"

function Tag(props) {

    return <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        <button onClick={props.onDelete} class="text-gray-600">&times; &nbsp;</button>
        {props.tag.name}
    </span>
  
  }
  
function Tags(props) {

    // const reactTags = useRef()

    const [tags, setTags] = useState(
        props.allTags.filter(function (tag) {
            return props.tags.includes(tag.id)
        })
    )

    const onDelete = useCallback((tagIndex) => {
        let newTags = tags.filter((_, i) => i !== tagIndex)
        setTags(newTags)
        axios.patch('/note/' + props.note_id + '/', {tags : newTags.map(e => e.id)}).then(res => {
        console.log(res)
        });

    }, [tags])

    const onAddition = useCallback((newTag) => {
        console.log(newTag)
        const idxAllTags = props.allTags.map(e => e.name).indexOf(newTag.name)
        console.log(idxAllTags)
        let newTags = []

        if(idxAllTags === -1) {
        axios.post('/note_tag/', {name: newTag.name}).then(response => {
            console.log(response)
            newTags = [...tags, response.data]
            props.updateAllTags(response.data)
            setTags(newTags)
            axios.patch('/note/' + props.note_id + '/', {tags : newTags.map(e => e.id)}).then(res => {
            console.log(res)
            });
        })
        } else {
        newTags = [...tags, props.allTags[idxAllTags]]
        setTags(newTags)
        axios.patch('/note/' + props.note_id + '/', {tags : newTags.map(e => e.id)}).then(res => {
            console.log(res)
        });
        }
    }, [tags])

const reactTagsClassNames = {
    root: 'react-tags',
    rootFocused: 'is-focused',
    selected: 'react-tags__selected',
    selectedTag: 'react-tags__selected-tag',
    selectedTagName: 'react-tags__selected-tag-name',
    search: 'react-tags__search',
    searchWrapper: 'react-tags__search-wrapper',
    searchInput: 'react-tags__search-input',
    suggestions: 'react-tags__suggestions',
    suggestionActive: 'is-active',
    suggestionDisabled: 'is-disabled',
    suggestionPrefix: 'react-tags__suggestion-prefix'
}

return (
    <>
    <div class="px-6 pt-4 pb-2">
        <ReactTags 
        tags={tags}
        suggestions={props.allTags}
        onDelete={onDelete}
        onAddition={onAddition}
        tagComponent={Tag}
        allowBackspace={false}
        minQueryLength={1}
        allowNew
        addOnBlur={true}
        placeholderText="Add a tag"
        classNames={reactTagsClassNames}
        />
    </div>
    </>
)

// return (
//   <div class="px-6 pt-4 pb-2">
//     {tags.map(tag => <Tag tag={tag.name} removeTag={removeTag} suggestions={allTags}/>)}
//     <button onClick={addNewTag} class="inline-block bg-gray-200 rounded-full px-3 py-1 text-lg font-semibold text-gray-700 mr-2 mb-2">
//       &#43;
//     </button>
//   </div>
// )
}

export default Tags;