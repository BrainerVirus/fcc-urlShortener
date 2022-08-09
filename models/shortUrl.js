import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ShortUrlSchema = new Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: Number,
    required: true,
  },
});

const ShortUrl = model("ShortUrl", ShortUrlSchema);
export default ShortUrl;
