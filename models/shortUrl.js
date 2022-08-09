import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ShortUrlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: Number,
    required: true,
  },
});

const ShortUrl = model("ShortUrl", ShortUrlSchema);
export default ShortUrl;
