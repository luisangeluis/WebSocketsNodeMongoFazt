import { loadNotes, onNewNote, onSelectedNote } from "./socket.client.js";
import { appendNote, fillForm, onHandleSubmit, renderNotes } from "./ui.js";

onNewNote(appendNote);
// renderNotes();
loadNotes(renderNotes);

onSelectedNote(fillForm);

const noteForm = document.querySelector("#noteForm");

noteForm.addEventListener("submit", onHandleSubmit)