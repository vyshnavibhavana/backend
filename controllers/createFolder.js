const folderModel= require("../models/createFolder")


const createFolder = async (req, res) => {
    const { folderName } = req.body;
  
    if (!folderName) {
      return res.status(400).json({ message: 'Folder name is required' });
    }
  
    try {
      const newFolder = new folderModel({ folderName });
      await newFolder.save();
  
      return res.status(201).json({ message: 'Folder created successfully', folderName: newFolder });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

 const  getallFolders =  async (req, res) => {
    try {
      const folders = await folderModel.find();
      return res.status(200).json({ message: 'Folders retrieved successfully', folders });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const deleteFolders =  async (req, res) => {
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
    createFolder,
    getallFolders,
    deleteFolders
  }