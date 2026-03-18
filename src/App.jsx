import React, { useEffect, useState } from 'react';
import { api } from './api';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';

function App() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null); // null = list view, object = editing, 'new' = creating
  const [error, setError] = useState(null);

  const loadNotes = () => {
    api.listNotes()
      .then(setNotes)
      .catch(() => setError('Could not load notes.'));
  };

  useEffect(() => { loadNotes(); }, []);

  const handleCreate = () => setEditing('new');

  const handleSelect = (note) => setEditing(note);

  const handleSave = async (data) => {
    try {
      if (editing === 'new') {
        await api.createNote(data);
      } else {
        await api.updateNote(editing.id, data);
      }
      setEditing(null);
      loadNotes();
    } catch {
      setError('Failed to save note.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteNote(id);
      loadNotes();
    } catch {
      setError('Failed to delete note.');
    }
  };

  const handleCancel = () => setEditing(null);

  return (
    <div className="app">
      <header>
        <h1>Notes</h1>
        {editing === null && (
          <button className="btn-primary" onClick={handleCreate}>+ New Note</button>
        )}
      </header>

      {error && <p className="error" onClick={() => setError(null)}>{error}</p>}

      {editing !== null ? (
        <NoteEditor
          note={editing === 'new' ? null : editing}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <NoteList notes={notes} onSelect={handleSelect} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
