import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    desc: {
      type: String,
      required: [true, 'Description is required'],
    },
    img: {
      type: String,
      required: [true, 'Image is required'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);