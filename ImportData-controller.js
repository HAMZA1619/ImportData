const ImportData = require("./models/ImportData-model");
const RelatedData = require("./models/relatedData-model");
const csv = require("csvtojson");
const multer = require("multer");
const http = require("https");
const fs = require("fs");
const Stream = require("stream").Transform;

module.exports.create = async function (req, res) {
  try {
    const importArray = await csv().fromString(req.file.buffer.toString());
    importArray.forEach(async (row) => {
      const newpost = await ImportData.findOne({
        post_id: Number(row["post id"]),
      });
      if (newpost) {
        await saveRelated(row, newpost._id);
        await updatePost(row, newpost._id);
      } else {
        let id = await savePost(row);
        await saveRelated(row, id);
      }
    });
    res.send(importArray);
  } catch (error) {
    console.log(error);
  }
};

async function savePost(data) {
  try {
    let post = {};
    post["page_id"] = await data["page id"];
    post["post_id"] = await Number(data["post id"]);
    post["ad_format"] = await data["ad format"];
    post["post_create"] = await data["post created"]
      .split("/")
      .join("-");
    post["last_seen"] = new Date().toLocaleDateString().split("/").join("-");
    post["intersted"] = await data["intersted"];
    post["ender"] = await data["ender"];
    post["age"] = await data["age"];
    post["country"] = await data["country = facebook account location"];
    post["country_see_in"] = await data["country = ad location"];
    post["lang"] = await data["language = ad_desciption"];
    post["t_lang"] = await data["language = for_target_audience"];
    post["page_link"] = await data["page link"];
    post["button"] = await data["Button"];
    post["share"] = await Number(data["shares number"]);
    post["comment"] = await Number(data["comment number"]);
    post["like"] = await Number(data["likes number"]);
    post["page_name"] = await data["facebook page name"];
    post["Ad_Description"] = data["Ad Description"];
    post["title"] = data["Ad Title"];
    post["category"] = data["category"];
    post["keywords"] = data["keywords"];
    post["resource"] = await Resource(data);
    const postAdded = await ImportData.create(post);
    return postAdded._id.toString();
  } catch (error) {
    console.log(error);
  }
}

async function saveRelated(data, id) {
  try {
    let Related = {};
    Related["post_id"] = id;
    Related["share"] = Number(data["shares number"]);
    Related["comment"] = Number(data["comment number"]);
    Related["like"] = Number(data["likes number"]);
    await RelatedData.create(Related);
  } catch (error) {
    console.log(error);
  }
}
async function updatePost(data, id) {
  try {
    let updatePost = {};
    updatePost["last_seen"] = new Date()
      .toLocaleDateString()
      .split("/")
      .join("-");
    updatePost["share"] = Number(data["shares number"]);
    updatePost["comment"] = Number(data["comment number"]);
    updatePost["like"] = Number(data["likes number"]);
    await ImportData.findOneAndUpdate({ _id: id }, updatePost, { new: true });
  } catch (error) {
    console.log(error);
  }
}
async function Resource(data) {
  try {
    let Resource = {};
    Resource["video"] = await uploadfile(data["video link"], ".mp4");
    Resource["image"] = await uploadfile(data["image link"], ".jpg");
    Resource["page_logo"] = await uploadfile(data["FB page Logo"], ".jpg");
    return Resource;
  } catch (error) {
    console.log(error);
  }
}
async function uploadfile(link, extension) {
  try {
    let name 
    http
      .request(link, function (response) {
        name = Math.floor(Math.random() * 100000000000) + extension;
        let data = new Stream();
        response.on("data", function (chunk) {
          data.push(chunk);
        });
        response.on("end", function () {
          fs.writeFileSync(__dirname + "/uploads/" + name, data.read());
        });
      })
      .end();
    return name;
  } catch (error) {
    return null;
  }
}
