import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

function Notes() {
  const [note, setNote] = useState(() => {
    // Retrieve notes from localStorage if they exist, otherwise start with an empty array
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    // Update localStorage whenever the notes change
    localStorage.setItem("notes", JSON.stringify(note));
  }, [note]);

  const handleInputChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNoteObj = { id: note.length + 1, text: newNote, date: new Date() };
    setNote([...note, newNoteObj]);
    setNewNote("");
  };

  return (
    <div className="mt-20 p-2">
      {/* Add Note section */}
      <div>
        <label htmlFor="note" className="mb-2 text-sky-500 font-bold text-2xl">
          Add a Note
        </label>

        <form onSubmit={handleSubmit} className="relative w-[615px]">
          <textarea
            id="note"
            value={newNote}
            onChange={handleInputChange}
            placeholder="enter text here and press Ctrl + Enter to add...."
            className="w-full h-[100px] border border-gray-300 rounded-lg p-2"
          />

          <button
            type="submit"
            className="absolute right-2 bottom-0 top-28 bg-sky-500 text-white rounded-md hover:bg-sky-700 w-[80px] h-[35px]"
          >
            Add
          </button>
        </form>
        {/* Note section */}
        <div className="mt-6 w-[615px]">
          {note.map((note) => (
            <div key={note.id} className="p-4 mt-1 w-full">
              <p className="text-gray-500 text-xl">{note.text}</p>
              <p className="text-sky-500 text-sm">
                {formatDistanceToNow(new Date(note.date))} ago
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
