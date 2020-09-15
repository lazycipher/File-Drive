const { Schema, model } = require('mongoose');

const FileSchema = new Schema({
    original_name: {
        type: String
    },
    file_name: {
      type: String
    },
    mimetype: {
      type: String
    },
    path: {
        type: String
    },
    size: {
      type: Number
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
        },
        avatar_url: {
          type: String
        }
    },
    uploaded_date: {
    type: Date,
    default: Date.now
  }
});

const File = model('file', FileSchema);

module.exports = File
