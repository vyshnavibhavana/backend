const path = require('path');
const fs = require('fs');
const Form = require('../models/formModel'); // Import the Form model

// url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,

const createForm = async (req, res) => {
    try {
        // Collecting form data
        const { text } = req.body;
        console.log(text,"text")
        
        // Collecting image data
        console.log("filteredtext")
        const images = req?.files?.map(file => ({
          originalName: file.originalname,
         url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
        }));
    
        // Create a new Data entry
        const newData = new Form({
          text: text, // Assuming the text field is passed as a JSON string
          images: images
        });


    
        // Save to MongoDB
        const savedData = await newData.save();
    
        // Send the response
        res.status(200).json({
          message: "Data successfully saved",
          formData: savedData,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving data', error });
      }
};

module.exports = {
  createForm,
};
