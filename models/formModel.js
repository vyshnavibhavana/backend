const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    text: [
        {
          type: mongoose.Schema.Types.Mixed, // This allows any kind of object
          required: false, // Adjust this depending on whether it's mandatory
        },
      ],
  images: [
    {
      originalName: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Data', DataSchema);
