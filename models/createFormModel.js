const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
    formName: { type: String},
    createdAt: { type: Date, default: Date.now },
  });

  const Form = mongoose.model('createForm', formSchema);
  module.exports = Form