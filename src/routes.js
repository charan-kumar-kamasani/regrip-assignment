const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

// routes
router.post('/notes', controllers.createNote);
router.get('/notes', controllers.getNotes);
router.get('/notes/:id', controllers.getNoteById);
router.put('/notes/:id', controllers.updateNoteById);
router.delete('/notes/:id', controllers.deleteNoteById);
router.put('/notes/:id/tags', controllers.addTagsToNote);
router.delete('/notes/:id/tags', controllers.removeTagsFromNote);
router.get('/notes/query', controllers.queryNotes);

module.exports = router;