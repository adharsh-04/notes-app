import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8081/api/notes")
        .then(res => setNotes(res.data));
  }, []);

  const addNote = () => {
    axios.post("http://localhost:8081/api/notes", { title, content })
        .then(res => setNotes([...notes, res.data]));
    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:8081/api/notes/${id}`)
        .then(() => setNotes(notes.filter(note => note.id !== id)));
  };

  return (
      <div className="container mt-5">
        <h2 className="mb-4">Notes App</h2>
        <div className="mb-3">
          <input className="form-control mb-2"
                 placeholder="Title"
                 value={title}
                 onChange={e => setTitle(e.target.value)} />
          <textarea className="form-control mb-2"
                    placeholder="Content"
                    value={content}
                    onChange={e => setContent(e.target.value)} />
          <button className="btn btn-primary" onClick={addNote}>Add Note</button>
        </div>
        <ul className="list-group">
          {notes.map(note => (
              <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{note.title}</h5>
                  <p>{note.content}</p>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => deleteNote(note.id)}>Delete</button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
