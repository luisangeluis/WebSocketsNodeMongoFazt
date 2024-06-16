import Note from "./models/Note";

export default (io) => {
  io.on("connection", (socket) => {
    console.log("New user conected");

    async function emitNotes() {
      const notes = await Note.find();

      io.emit("server:loadnotes", notes)
    }

    emitNotes();

    socket.on("client:newnote", async (data) => {
      console.log(data);
      const newNote = new Note(data);
      const savedNote = await newNote.save();

      io.emit("server:newnote", savedNote);
      // console.log(savedNote);
    });

    socket.on("client:deletenote", async (id) => {
      // console.log(id);
      await Note.findByIdAndDelete(id);
      emitNotes();
    })


    socket.on("client:getnote", async (id) => {
      console.log(id);
      const note = await Note.findById(id);
      console.log(note);

      io.emit("server:selectednote", note)
    })

    socket.on("client:updatenote", async (updatedNote) => {
      // console.log({ data });

      await Note.findByIdAndUpdate(updatedNote._id, {
        title: updatedNote.title,
        description: updatedNote.description
      })

      emitNotes();

    })
  })
}