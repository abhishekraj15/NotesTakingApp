import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { createNote } from "./api/api";

const App = () => {
  const handleCreateNote = async (note) => {
    await createNote(note);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 tracking-wide">
          📝 Quick Notes
        </h1>
        <p className="text-gray-600 mt-2">Capture your thoughts instantly!</p>
      </div>

      <div className="w-full max-w-2xl mt-6">
        <NoteForm onSubmit={handleCreateNote} />
      </div>

      <div className="w-full max-w-4xl mt-8">
        <NoteList />
      </div>
    </div>
  );
};

export default App;
