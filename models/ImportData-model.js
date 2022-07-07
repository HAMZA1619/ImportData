const Mongoose = require("mongoose");

const PostsSchema = new Mongoose.Schema(
  {
    page_id: {
      type: String,
      default: null,
    },
    post_id: {
      type: Number,
      default: null,
    },
    ad_format: {
      type: String,
      default: null,
    },
    landanig_page: {
      type: String,
      default: null,
    },
    post_link: {
      type: String,
      default: null,
    },
    post_create: {
      type: String,
      default: null,
    },
    last_seen: {
      type: String,
      default: null,
    },
    interested: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    age: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    lang: {
      type: String,
      default: null,
    },
    country_see_in: {
      type: String,
      default: null,
    },
    t_lang: {
      type: String,
      default: null,
    },
    page_link: {
      type: String,
      default: null,
    },
    button: {
      type: String,
      default: null,
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
    page_name: {
      type: String,
      default: null,
    },
    Ad_Description: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    keywords: {
      type: String,
      default: null,
    },
    resource: {
      video: {
        type: String,
        default: null,
      },
      image: {
        type: String,
        default: null,
      },
      page_logo: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("posts", PostsSchema);
