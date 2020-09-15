const { Schema, model } = require('mongoose');

const FileSchema = new Schema({
    name: {
        type: String
    },
    download_url: {
        type: String
    },
    is_public: {
        type: Boolean,
        default: false
    },
    user: {
        id: {
          type: Schema.Types.ObjectId,
          required: true
        },
        username: {
          type: String,
          required: true
        }
    },
    uploaded_date: {
    type: Date,
    default: Date.now
  }
});

const File = model('file', FileSchema);

module.exports = File
