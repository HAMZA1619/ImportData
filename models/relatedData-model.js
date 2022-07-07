const Mongoose = require("mongoose");

const postrelatedsSchema = new Mongoose.Schema(
  {
    post_id: {
      type: String,
    },

    share: {
      type: Number,
      default: 0,
    },
    comment: {
      type: Number,
      default: 0,
    },
    like: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("postrelateds", postrelatedsSchema);
