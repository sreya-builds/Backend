const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    city: {
      type: String,
      required: true
    },

    address: {
      type: String
    },

    education: {
      type: String,
      enum: ["10th", "12th", "Diploma", "Graduate", "Post Graduate"]
    },

    professional: {
      type: String
    },

    salary: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;