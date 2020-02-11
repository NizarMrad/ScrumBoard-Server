const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const App = express();

App.use(bodyParser.json());
App.use(cors());

mongoose.connect("mongodb://localhost/db-scrum-new", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Story = mongoose.model("Story", {
  statusValue: String,
  storyValue: String,
  descriptionValue: String
});

App.post("/create", async (req, res) => {
  try {
    const newStory = new Story({
      statusValue: req.body.statusValue,
      storyValue: req.body.storyValue,
      descriptionValue: req.body.descriptionValue
    });
    await newStory.save();
    res.json({ message: "New story created" });
    console.log(typeof start);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

App.get("/", async (req, res) => {
  try {
    const tasks = await Story.find().sort({ name: "desc" });
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

App.put("/update/:id", async (req, res) => {
  try {
    const story = await Story.findById({
      _id: req.params.id
    });
    if (story) {
      story.statusValue = req.body.statusValue;
      await story.save();
      res.json({ message: "Updated" });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

App.post("/delete/:id", async (req, res) => {
  try {
    await Story.findOneAndDelete({
      _id: req.params.id
    });
    res.json({ message: "Removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

App.listen(3200, () => {
  console.log("Server started on port 3200");
});
