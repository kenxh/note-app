import { useState } from "react";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

const Note = ({
  id,
  note,
  date,
  changeEditStatus,
  edit,
  currNoteId,
  saveNote,
  disabled,
}) => {
  const [currNote, setCurrNote] = useState(note);

  const editNote = (e) => {
    if (currNoteId !== id) {
      changeEditStatus(id);
    }
    setCurrNote(e.target.value);
  };

  const save = () => {
    // TODO: call saveNote with id & the currNote state variable
    saveNote(id, currNote);
  };

  const isCurrNote = currNoteId === id;

  return (
    <div className="col-3 note" key={id}>
      <Form>
        <Form.Group>
          {/** TODO: pass a couple important props to each Note component
           * pass note to the defaultValue prop
           * pass the editNote function to the onChange prop
           * pass disabled to the disabled prop
           */}
          <FormControl as="textarea" rows={5} defaultValue={note} onChange={editNote} dsiabled={disabled}/>
          <InputGroup.Append>
            {edit && isCurrNote && (
              // TODO: pass the save function to the onClick prop of Button
              <Button className="save-btn" onClick={save}>Save</Button>
            )}
          </InputGroup.Append>
        </Form.Group>
      </Form>
      {/**For fun: figure out other ways to display the date */}
      <div className="date">{date.toLocaleString()}</div>
    </div>
  );
};

export default Note;
