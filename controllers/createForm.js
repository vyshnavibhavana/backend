const formModel= require("../models/createFolder")


const createForm = async (req, res) => {
    const { folderName } = req.body;
  
    if (!folderName) {
      return res.status(400).json({ message: 'Folder name is required' });
    }
  
    try {
      const newFolder = new formModel({ folderName });
      await newFolder.save();
  
      return res.status(201).json({ message: 'Folder created successfully', folderName: newFolder });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

 const  getallForms =  async (req, res) => {
    try {
      const folders = await formModel.find();
      return res.status(200).json({ message: 'Folders retrieved successfully', folders });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const deleteForms =  async (req, res) => {
    const { id } = req.params;
  
    try {
      const folder = await folderModel.findByIdAndDelete(id);
  
      if (!folder) {
        return res.status(404).json({ message: 'Folder not found' });
      }
  
      return res.status(200).json({ message: 'Folder deleted successfully', folder });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports ={
    createForm,
    getallForms,
    deleteForms
  }