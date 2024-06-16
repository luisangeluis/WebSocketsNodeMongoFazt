import { deleteNote, getNote, saveNote, updateNote } from "./socket.client.js";

const noteList = document.querySelector("#notes");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

let savedId = "";

const noteUI = note => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card card-body rounded-0 mb-2 animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between">
        <h1>Title: ${note.title}</h1>
        <div>
          <button class="btn btn-danger btnDelete" data-id="${note._id}">Delete</button>
          <button class="btn btn-secondary btnUpdate" data-id="${note._id}">Update</button>
        </div>
      </div>
      <p>Description: ${note.description}</p>
      
    </div>
  `
  const btnDelete = div.querySelector(".btnDelete");
  const btnUpdate = div.querySelector(".btnUpdate");
  // console.log(btnDelete.dataset.id);
  btnDelete.addEventListener("click", e => deleteNote(btnDelete.dataset.id));

  btnUpdate.addEventListener("click", e => {
    // console.log(btnUpdate.dataset.id);
    getNote(btnUpdate.dataset.id)
  });

  return div
}

export const renderNotes = (notes) => {
  noteList.innerHTML = "";
  // console.log(notes);
  notes.forEach(note => noteList.append(noteUI(note)));
}

export const fillForm = (note) => {
  title.value = note.title;
  description.value = note.description;

  savedId = note._id;
}

export const onHandleSubmit = (e) => {
  e.preventDefault();
  console.log({ savedId });
  if (savedId)
    // console.log("updating");
    updateNote(savedId, title.value, description.value);
  else
    saveNote(title.value, description.value);

  savedId = "";
  title.value = "";
  description.value = "";
}

export const appendNote = note => {
  noteList.append(noteUI(note))
}