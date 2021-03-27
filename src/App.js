import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useAuthState } from "react-firebase-hooks/auth";

import { app_background } from "./data/markdown";

import Button from "react-bootstrap/Button";

import db from "./data/services/database";
import fb from "./data/services/firebase_config";

import Note from "./Note";
import Login from "./Login";

const App = () => {
  const [edit, setEdit] = useState(false);
  const [notes, setNotes] = useState(null);
  const [currNoteId, setCurrNoteId] = useState("");
  const [user] = useAuthState(fb.auth);

  const login = (email, password) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .catch((e) => console.log(e));
    console.log("pizza")
  };

  const logout = () => {
    fb.auth.signOut();
  };

  const changeEditStatus = (id) => {
    setCurrNoteId(id);
    if (id !== currNoteId) {
      setEdit(!edit);
    }
  };

  const saveNote = (id, note) => {
    setEdit(!edit);
    if (id) {
      // a.k.a if this note already exists in the database & it's being edited
      // TODO: using the "db" variable, call the updateNote function
      // pass it id, note, and a new date object like so: new Date().getTime()
      db.updateNote(id, note, new Date().getTime())
    } else {
      // a.k.a a completely new note
      const date = new Date().getTime();
      const savedNote = { note, date };
      const key = db.createNote(savedNote); // returns the key from our createNote function
      if (notes) {
        // a.k.a if this is not the first note ever created in the database
        // TODO: using the spread operator, call setNotes & pass it an array
        // containing what was already in notes as well as an object containing
        // an id (with the value of the key variable), note and date
        setNotes([...notes, {id, key, savedNote}])
      } else {
        // a.k.a if this is the first note ever made
        // TODO: pass setNotes an array with a single object, containing the same info
        // as the object described in the if block above
        setNotes([{id, key, savedNote}])
      }
    }
  };

  const addNote = () => {
    // TODO: call saveNote passing in a null id & empty string
    saveNote(null, "")
  };

  useEffect(() => {
    // TODO: check if notes is null. if so, call the getAllNotes method using the variable "db"
    // make sure to pass the setter function for the notes state variable to getAllNotes
    if (!notes) {
      db.getAllNotes(setNotes)
    }
  }, [notes]);

  return (
    <div className="home">
      <div id="content">
        <ReactMarkdown className="background" source={app_background} />
        <div className="container">
          <div className="justify-content-md-center">
            {user ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              // TODO: pass the login function as prop called "onLogin" to the Login component
              <Login onLogin={login} />
            )}
          </div>
          <div className="row justify-content-md-center">
            {notes &&
              notes.map(({ id, note, date }) => (
                /** TODO: pass a whole lot of props to the Note component
                 * pass the value of id to the key & id prop
                 * pass the value of note, currNoteId, changeEditStatus, edit, saveNote
                 * the disabled prop will turn off editing when the user isn't logged in
                 */
                <Note date={new Date(date)} disabled={!user} id={id} note={note} currNoteId={currNoteId} 
                changeEditStatus={changeEditStatus} edit={edit} saveNote={saveNote}/>
              ))}
          </div>
          {/**TODO: use the double amperstand (&&) to show a button only if the user variable is not null
           * pass the addNote function to the Button when clicked
           * This is the Add Note button :)
           * TIP: there's an example of how to do this on line 85
           */}
           {user && <Button onClick={addNote}>Add Note</Button>}
        </div>
      </div>
    </div>
  );
};

export default App;
