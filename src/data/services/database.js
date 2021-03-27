import firebase from "./firebase_config";

const db = firebase.db.ref("notes");

const getAllNotes = (setNotes) => {
  return db.on("value", function (snapshot) {
    const dto = snapshot.val();

    // TODO: if dto is null, pass an empty array to setNotes & return early
    if (dto == null) {
      setNotes([]);
      return setNotes
    };

    // firebase returns an object full of objects, with the unique id as each inner object's key
    // this manipulates that data so each inner object contains this unique id as a property
    const result = Object.keys(dto).map((id) => ({
      id,
      note: dto[id].note,
      date: dto[id].date,
    }));

    setNotes(Object.values(result));
  });
};

const createNote = (data) => {
  // this generates a unique id for any data that's about to be sent to the database
  const newNote = db.push();
  // this passes the data to the database
  newNote.set(data);
  // we return the generated key to store it locally :)
  return newNote.key;
};

const updateNote = (id, note, date) => {
  // TODO: using db.child & chaining on the .update method, finish the code to update a note already in the database
  // this is meant to be challenging, so you'll need to google how to use .update
  // tip: db is already equal to firebase.database.ref("notes")
  db.child(id).update({ note, date });
};

/**CHALLENGE: create a function called removeNote that takes in an id and deletes a note in the database
 *
 */

const methods = {
  getAllNotes,
  createNote,
  updateNote,
  // don't forget to export removeNote if you write it
};

export default methods;
