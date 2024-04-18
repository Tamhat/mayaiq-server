const router = require("express").Router();
const Project = require("../models/Project");

//create a project
router.post("/create", async (req, res) => {
  try {
    const { name, description, files, createdBy, projectId } = req.body;
    const newProject = await Project.create({
      name,
      description,
      files,
      createdBy,
      projectId
    });
    await newProject.save();
    res.status(200).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//get projects of a user
router.get("/:userId/:projectId", async (req, res) => {
  try {
    console.log(req.params);
    const userId = req?.query?.userId;
    const projectId = req?.query?.projectId;
    const projects = await Project.find({ createdBy: userId, projectId });
    res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get("/userproject", async (req, res) => {
  try {
    console.log(req?.query);
    const getUserProject = req?.query?.userId;
    const projects = await Project.find({ createdBy: getUserProject }).populate(
      "files"
    );
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.put("/updateproject/:id", async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const updateproject = await Project?.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(updateproject);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
