const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/getuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


//Get all the Notes
router.get('/fetchNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Unexpected Error Occured")
    }
});


//Adding New Note
router.post('/addNote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        //Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Unexpected Error Occured")
    }
});


//update Notes
router.put('/updateNote/:id', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) {
            newNote.title = title
        } if (description) {
            newNote.description = description
        } if (tag) {
            newNote.tag = tag
        }

        //Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Unexpected Error Occured")
    }
});


//Delete Note
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorize")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been Deleted !!!" })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Unexpected Error Occured")
    }
});
module.exports = router