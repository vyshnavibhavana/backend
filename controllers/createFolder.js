const folderModel= require("../models/createFolder")
const Data = require('../models/formModel');

const createFolder = async (req, res) => {
    const { folderName,formName } = req.body;
  
    if (!folderName) {
      return res.status(400).json({ message: 'Folder name is required' });
    }
  
    try {
      const newFolder = new folderModel({ folderName,formName });
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


  // const getFoldersAndFormData = async (req, res) => {
  //   try {
  //     // Perform aggregation to join `Data` with `Folder` and include folder details
  //     const foldersWithData = await Data.aggregate([
  //       {
  //         $lookup: {
  //           from: 'folders', // The collection name for `Folder`
  //           localField: 'folderId', // The field in the `Data` model
  //           foreignField: '_id', // The field in the `Folder` model
  //           as: 'folderDetails', // The field name to store the folder details
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'datas', // The collection name for `Data` (if nested join is needed)
  //           localField: '_id', // `_id` field of the current Data collection
  //           foreignField: 'folderId', // The `folderId` in Data collection (if needed)
  //           as: 'linkedData', // The field name to store additional linked data (optional)
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           text: 1,
  //           images: 1,
  //           userId: 1,
  //           folderId: 1,
  //           createdAt: 1,
  //           folderDetails: { $arrayElemAt: ['$folderDetails', 0] }, // Flatten folderDetails array
  //           linkedData: 1, // Include additional linked data (optional)
  //         },
  //       },
  //     ]);
  
  //     console.log(foldersWithData);
  
  //     res.status(200).json({
  //       message: 'Folders with linked data fetched successfully',
  //       folders: foldersWithData,
  //     });
  //   } catch (error) {
  //     console.error('Error fetching folders with linked data:', error);
  //     res.status(500).json({ message: 'Error fetching folders', error });
  //   }
  // };
  
  const getFoldersAndFormData = async (req, res) => {
    try {
      // Fetch all folders
      const folders = await folderModel.find().lean();
  
      // Fetch all data
      const data = await Data.find().lean();
  
      // Map through folders and attach linked data
      const foldersWithData = folders.map((folder) => {
        // Find all data entries with matching folderId
        const linkedData = data.filter((item) => String(item.folderId) === String(folder._id));
        console.log(linkedData)
  
        // Return the folder object with linked data
        return {
          ...folder,
          linkedData,
        };
      });
  
      res.status(200).json({
        message: 'Folders with linked data fetched successfully',
        folders: foldersWithData,
      });
    } catch (error) {
      console.error('Error fetching folders with linked data:', error);
      res.status(500).json({ message: 'Error fetching folders', error });
    }
  };
  module.exports ={
    createFolder,
    getallFolders,
    deleteFolders,
    getFoldersAndFormData
  }