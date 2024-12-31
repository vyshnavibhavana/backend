const mongoose = require("mongoose");

const FormDataSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true }, 
});

const FormSchema = new mongoose.Schema({
  formData: [FormDataSchema],
  formName: { type: String, required: true },
  id: { type: Number, required: true },
});

const FolderSchema = new mongoose.Schema({
  folderName: { type: String, required: true },
  folderId: { type: Number, unique: true },
  form: [FormSchema], 
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Folder", FolderSchema);
