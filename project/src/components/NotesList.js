import React  from "react";

const NotesList=(props)=>{
    return(
        <div>
      {props.notes && (
        <ul>                                   
          {props.notes.map((note) => (
            <li>
                <h3>{note.name}</h3>
                <p>{note.desc}</p>
             <button onClick={()=>props.handDelete(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    )
}


export default NotesList

//onClick={() => props.handDelete(exp.productId)}