const mongoose = require("mongoose")

const folderSchema = new mongoose.Schema({
    folderName: { type: String},
    createdAt: { type: Date, default: Date.now },
  });

  const Folder = mongoose.model('Folder', folderSchema);
  module.exports = Folder