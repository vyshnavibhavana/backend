const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  formData: [
    {
      label: { type: String, required: true },
      value: { type: mongoose.Schema.Types.Mixed, required: true },
    },
  ],
  userId: { type: String, required: true },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false }, // For completion status
});

module.exports = mongoose.model('Data', DataSchema);
