const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Helper function to read notes from notes.json
const readNotes = () => {
    const data = fs.readFileSync('src/notes.json', 'utf-8');
    return JSON.parse(data);
};

// Helper function to write notes to notes.json
const writeNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2));
};

// Create a new note
exports.createNote = (req, res) => {
    const { title, content, tags } = req.body;
    const notes = readNotes();
    const note = { id: uuidv4(), title, content, tags: tags || [] };
    notes.push(note);
    writeNotes(notes);
    res.status(201).json(note);
};

// Retrieve all notes
exports.getNotes = (req, res) => {
    const notes = readNotes();
    res.status(200).json(notes);
};

// Retrieve a single note by its ID
exports.getNoteById = (req, res) => {
    const notes = readNotes();
    const note = notes.find((n) => n.id === req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
};

// Update a note by its ID
exports.updateNoteById = (req, res) => {
    const notes = readNotes();
    const note = notes.find((n) => n.id === req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const { title, content, tags } = req.body;
    note.title = title || note.title;
    note.content = content || note.content;
    note.tags = tags || note.tags;
    writeNotes(notes);
    res.status(200).json(note);
};

// Delete a note by its ID
exports.deleteNoteById = (req, res) => {
    let notes = readNotes();
    const noteIndex = notes.findIndex((n) => n.id === req.params.id);
    if (noteIndex === -1) return res.status(404).json({ message: "Note not found" });

    notes.splice(noteIndex, 1);
    writeNotes(notes);
    res.status(204).send();
};

// Add tags to a note
exports.addTagsToNote = (req, res) => {
    const notes = readNotes();
    const note = notes.find((n) => n.id === req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const { tags } = req.body;
    note.tags.push(...tags);
    writeNotes(notes);
    res.status(200).json(note);
};

// Remove tags from a note
exports.removeTagsFromNote = (req, res) => {
    const notes = readNotes();
    const note = notes.find((n) => n.id === req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const { tags } = req.body;
    note.tags = note.tags.filter((tag) => !tags.includes(tag));
    writeNotes(notes);
    res.status(200).json(note);
};

// Retrieve notes based on a logical tag query
exports.queryNotes = (req, res) => {
    const { and, or, not } = req.query;
    let notes = readNotes(); 

    // Handle AND condition
    if (and) {
        const andTags = and.split(',');
        notes = notes.filter(note => 
            andTags.every(tag => note.tags.includes(tag))
        );
        console.log('After AND filter:', notes);
    }

    // Handle OR condition
    if (or) {
        const orTags = or.split(',');
        notes = notes.filter(note => 
            orTags.some(tag => note.tags.includes(tag))
        );
        console.log('After OR filter:', notes);
    }

    // Handle NOT condition
    if (not) {
        const notTags = not.split(',');
        notes = notes.filter(note => 
            notTags.every(tag => !note.tags.includes(tag))
        );
        console.log('After NOT filter:', notes);
    }

    // Return results
    if (notes.length === 0) {
        console.log('No matching notes found.');
        return res.status(404).json({ message: "No notes match your query." });
    }

    console.log('Matching notes:', notes);
    res.status(200).json(notes);
};