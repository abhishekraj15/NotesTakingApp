import { useState } from "react";

const NoteForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition hover:shadow-xl">
      <h2 className="text-xl font-semibold text-blue-700 mb-3">
        Create a Note
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
