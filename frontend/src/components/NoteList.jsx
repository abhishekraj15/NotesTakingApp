import { useEffect, useState } from "react";
import { getNotes, deleteNote, updateNote } from "../api/api";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    getNotes().then(({ data }) => setNotes(data));
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleUpdate = async () => {
    await updateNote(editId, { title: editTitle, content: editContent });
    setEditId(null);
    fetchNotes();
  };

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {notes.length === 0 && (
        <p className="text-center text-gray-500 col-span-full text-lg">
          No notes available. Start writing!
        </p>
      )}

      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
          {editId === note._id ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 text-gray-700 rounded-md"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border border-gray-300 text-gray-700 rounded-md"
                rows="3"
              />
              <div className="flex justify-between mt-2">
                <button
                  onClick={handleUpdate}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
                >
                  <FiCheck /> Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition"
                >
                  <FiX /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold">{note.title}</h3>
              <p className="bg-white text-gray-700 p-2 mt-2 rounded">
                {note.content}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(note)}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NoteList;
