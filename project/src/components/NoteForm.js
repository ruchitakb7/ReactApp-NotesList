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
    
        const filterednotes = notes.filter((note) =>
            note.name.toLowerCase().includes(search.toLowerCase())
          )
    
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
        console.log(notes)
        setNotes([...notes,newnote])
        setName('')
        setDesc('')
    }

    useEffect(()=>{
        let savedNotes=localStorage.getItem('notes')
        console.log(savedNotes)
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
        setNotes(filteredNotes)
    }

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
            <p >Total Entry:{notes.length}</p>
            <p>Showing :{filterednotes.length}</p>
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
        <NotesList notes={notes}  handDelete={deleteNote}></NotesList>
    </div>
    )
}

export default NoteForm;