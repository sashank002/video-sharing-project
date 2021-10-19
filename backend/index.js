const express = require("express");
const mongodb = require("mongodb");
const fs = require("fs");
const cors = require("cors");
var multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const ObjectId = require("mongodb").ObjectId;

const MongoClient = mongodb.MongoClient;
const connectionURL = "mongodb://127.0.0.1:27017";

const databaseName = "video-streaming-test";

const app = express();
app.use(express.json());
app.use(cors());

var storageVideos = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var uploadVideos = multer({ storage: storageVideos }).single("file");

app.post("/submit", (req, res) => {
  uploadVideos(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    } else {
      //console.log(req.file)
      res.status(200).send(req.file);

      MongoClient.connect(connectionURL, async (error, client) => {
        if (error) {
          return console.log("sorry cant connect to database!");
        }

        const dbRef = client.db(databaseName);

        const bucket = new mongodb.GridFSBucket(dbRef);

        const videoUploadStream = bucket.openUploadStream(
          req.file.filename.slice(0, -4)
        );

        const videoReadStream = fs.createReadStream(
          `public/${req.file.filename}`
        );

        var fileId = videoReadStream.pipe(videoUploadStream);

        ffmpeg(`public/${req.file.filename}`)
          .on("filenames", function (filenames) {
            //console.log(filenames)
            console.log("Will generate " + filenames.join(", "));
          })
          .on("end", function () {
            //console.log('Screenshots taken');
          })
          .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 1,
            folder: "public/thumbnails/",
            filename: `${req.file.filename.slice(0, -4)}-thumb`, // custom filename
          });

        dbRef
          .collection("video-details")
          .insertOne({
            _id: fileId.id,
            videoname: req.query.videoname,
            description: req.query.videodescription,
            category: req.query.videocategory,
            thumbnailpath: `http://localhost:8000/thumbnails/${req.file.filename.slice(
              0,
              -4
            )}-thumb.png`,
          })
          .then((res) => {
            // console.log(res)
          })
          .catch((e) => {
            console.log(e);
          });

        console.log("SUCCESS!!");
      });
    }
  });
});

app.get("/video", (req, res) => {
  MongoClient.connect(connectionURL, (error, client) => {
    if (error) {
      return console.log("sorry cannot connect to database");
    }

    const range = req.headers.range;

    if (!range) {
      return res.status(404).send("Please send Range!!");
    }

    const dbRef = client.db(databaseName);
    // GridFS Collection
    console.log("id", req.query.id);

    dbRef
      .collection("fs.files")
      .findOne({ _id: new ObjectId(req.query.id) })
      .then((video) => {
        //console.log(video)

        const videoSize = video.length;
        const start = Number(range.replace(/\D/g, ""));
        const end = videoSize - 1;

        const contentLength = end - start + 1;

        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
        };

        // HTTP Status 206 for Partial Content
        //res.writeHead(206, headers);                      // aa line error aapti hati etle kadhi nakhi

        // create video read stream for this particular chunk
        const bucket = new mongodb.GridFSBucket(dbRef);
        const downloadStream = bucket.openDownloadStreamByName(video.filename, {
          start,
        });
        //console.log(res)
        // Stream the video chunk to the client
        downloadStream.pipe(res);
      })
      .catch((e) => {
        //console.log("hiii" + e)
      });
  });
});

app.get("/details2", (req, res) => {
  console.log(req.query.category);
  MongoClient.connect(connectionURL, (error, client) => {
    if (error) {
      return console.log("sorry cannot connect to database");
    }
    const dbRef = client.db(databaseName);

    if (req.query.id) {
      dbRef
        .collection("video-details")
        .findOne({ _id: new ObjectId(req.query.id) })
        .then((data) => {
          res.status(201).send(data);
        });
    } else {
      if (!req.query.category) {
        dbRef
          .collection("video-details")
          .find({})
          .toArray()
          .then((arr) => {
            res.status(201).send(arr);
          });
      } else {
        dbRef
          .collection("video-details")
          .find({ category: req.query.category })
          .toArray()
          .then((arr) => {
            res.status(201).send(arr);
          });
      }
    }
  });
});

const path = require("path");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/thumbnail", (req, res) => {
  MongoClient.connect(connectionURL, (error, client) => {
    if (error) {
      return console.log("sorry cannot connect to database");
    }
    const dbRef = client.db(databaseName);
    // GridFS Collection
    dbRef
      .collection("video-details")
      .findOne({})
      .then((response) => {
        if (response) {
          console.log(response.thumbnailpath);
          res.send(response.thumbnailpath);
        }
      });
  });
});

app.get("/date", (req, res) => {
  MongoClient.connect(connectionURL, (error, client) => {
    if (error) {
      return console.log("error aai che lodaa", error);
    }

    const dbRef = client.db(databaseName);

    dbRef
      .collection("fs.files")
      .find({})
      .toArray()
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.listen(8000, function () {
  console.log("server is running");
});
