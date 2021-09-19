const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const fetchuser = require("../middleware/fetchuser");

const Notes = require("../models/Notes");

// Route 1 : fetch all notes (GET Request)

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    console.log(notes);
    res.json(notes);
  } catch (error) {
    console.log("there is an error in fetching the notes", error);
  }
});

//Route 2 : insert notes to database (POST Request)

router.post(
  "/addnote",
  fetchuser,
  [
    // body("title", "enter a  title").isEmail(),
    body("description", "enter a description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log("there is an error in saving the notes", error);
    }
  }
);

// Route 3: update an existing notes

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // create a new note object

  const newNote = {};

  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // find the note to be updated and update it

  console.log(req.params.id);

  let note = await Notes.findById(req.params.id);

  console.log(note);

  if (!note) {
    res.status(404).send("Not found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }

  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );

  res.send(note);
});

// Route 4: delete an existing notes

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // find the note to be updated and update it

  console.log(req.params.id);

  let note = await Notes.findById(req.params.id);

  console.log(note);

  if (!note) {
    res.status(404).send("Not found");
  }

  // allow deletion only if user own this note

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id);

  res.json({ success: "Note has been deleted", note: note });
});

module.exports = router;
