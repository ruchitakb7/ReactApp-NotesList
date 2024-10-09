import React,{useState,useEffect} from "react"
import NotesList from "./NotesList"


const NoteForm =()=>{

    const [name,setName]=useState('')
    const [desc,setDesc]=useState('')
    const [notes,setNotes]=useState()
    const [search,setSearch]=useState('')


    const nameHandler=(event)=>{
        setName(event.target.value)
    }

    const descHandler=(event)=>{
         setDesc(event.target.value)
    }

    const searchHandler=(event)=>{
       setSearch(event.target.value)
    }
   
    const filterednotes = Array.isArray(notes)? notes.filter((note) =>
        note.name.toLowerCase().includes(search.toLowerCase())):[]
     
    
    const addNote=()=>{     
        if(name.trim().length===0 || desc.trim().length===0)
        {
            alert('Fill The Input Feild Properly')
            return;
        }
        const newnote={
            name:name,
            desc:desc,
            id:Math.random()
        }
        setNotes([...notes,newnote])
        setName('')
        setDesc('')
    }

    useEffect(()=>{
        let savedNotes=localStorage.getItem('notes')
        if(savedNotes==='undefined')
        {
            savedNotes =[]
            setNotes(savedNotes)
        }
        else
        {
            setNotes(JSON.parse(savedNotes))
        }
    },[])

    useEffect(()=>{   
            localStorage.setItem('notes',JSON.stringify(notes))
    },[notes])

    const deleteNote=(id)=>{
        const filteredNotes=notes.filter(note=>note.id!==id)
        setNotes(filteredNotes)}

    return(
    <div>
        <center>
            <div>
                <label>Search : </label>
                <input type="text"
                value={search}
                onChange={searchHandler}></input>
            </div>
            <div>
            <p >Total Entry:{Array.isArray(notes)?notes.length:0}</p>
            <p>Showing :{Array.isArray(filterednotes)?filterednotes.length:0}</p>
            </div>          
        </center>
        <div>
            <div>
            <label>Name : </label>
            <input type="text"
            value={name}
            onChange={nameHandler}>
            </input>
            </div>
            <div>
            <label>Book Desc : </label>
            <input type="text"
            value={desc}
            onChange={descHandler}>
            </input>
            </div>
            <div>
                <button onClick={addNote}>Add Book</button>
            </div>
        </div> 
        <NotesList notes={filterednotes}  handDelete={deleteNote}></NotesList>
    </div>
    )
}

export default NoteForm;