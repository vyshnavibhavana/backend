const Data = require('../models/formModel');
const Folder = require('../models/createFolder');

const createFolder = async (req, res) => {
  try {
    const folderData = req.body;
    const newFolder = new Folder(folderData);  // Use the Folder model

    await newFolder.save();
    res.status(201).json({ message: "Folder created successfully", folder: newFolder });
  } catch (error) {
    res.status(500).json({ message: "Error creating folder", error: error.message });
  }
};

//  const  getallFolders =  async (req, res) => {
//     try {
//       const folders = await Folder.find();
//       return res.status(200).json({ message: 'Folders retrieved successfully', folders });
//     } catch (err) {
//       console.error('Error:', err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };

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
        foldersWithData,
      });
    } catch (error) {
      console.error('Error fetching folders with linked data:', error);
      res.status(500).json({ message: 'Error fetching folders', error });
    }
  };

  const getFoldersAndFormDataByUserId = async (req, res) => {
    try {
      const { userId } = req.query; // Get userId from query parameters (or req.body if preferred)
  
      if (!userId) {
        return res.status(400).json({ message: 'UserId is required' });
      }
  
      // Fetch all folders created by the user
      const folders = await folderModel.find({ userId }).lean();
  
      // Fetch all data created by the user
      const data = await Data.find({ userId }).lean();
  
      // Map through folders and attach linked data
      const foldersWithData = folders.map((folder) => {
        // Find all data entries with matching folderId
        const linkedData = data.filter((item) => String(item.folderId) === String(folder._id));
  
        // Return the folder object with linked data
        return {
          ...folder,
          linkedData,
        };
      });
  
      res.status(200).json({
        message: 'Folders with linked data fetched successfully',
        foldersWithData,
      });
    } catch (error) {
      console.error('Error fetching folders with linked data:', error);
      res.status(500).json({ message: 'Error fetching folders', error });
    }
  };

const getFolderById = async (req, res) => {
  try {
    const { folderId } = req.params; // Extract folderId from URL params
    const folder = await Folder.findOne({ folderId: folderId });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json(folder);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving folder", error: error.message });
  }
};
const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFolder = await Folder.findOneAndDelete(id);

    if (!deletedFolder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json({ message: "Folder deleted successfully", folder: deletedFolder });
  } catch (error) {
    res.status(500).json({ message: "Error deleting folder", error: error.message });
  }
};
const getAllFolders = async (req, res) => {
  try {
    const folders = await Folder.find(); // Fetch all folders from the database
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving folders", error: error.message });
  }
};
const deleteAllFolders = async (req, res) => {
  try {
    const deletedFolders = await Folder.deleteMany(); // Deletes all folders
    res.status(200).json({ message: "All folders deleted successfully", deletedCount: deletedFolders.deletedCount });
  } catch (error) {
    res.status(500).json({ message: "Error deleting folders", error: error.message });
  }
};
  module.exports = { getFoldersAndFormData };

  
  module.exports ={
    createFolder,
    getFolderById,
    deleteFolder,
    getAllFolders,
    deleteAllFolders,
    deleteFolders,
    getFoldersAndFormData,
    getFoldersAndFormDataByUserId
  }