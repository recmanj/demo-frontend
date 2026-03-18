import React from 'react';

function NoteList({ notes, onSelect, onDelete }) {
  if (notes.length === 0) {
    return <p className="empty">No notes yet. Create one!</p>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note.id} className="note-card" onClick={() => onSelect(note)}>
          <div className="note-card-header">
            <h3>{note.title}</h3>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
            >
              ✕
            </button>
          </div>
          <p className="note-preview">
            {note.content.length > 120 ? note.content.slice(0, 120) + '…' : note.content}
          </p>
          <time>{new Date(note.created_at).toLocaleDateString()}</time>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
