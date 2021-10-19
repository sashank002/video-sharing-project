import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Video.css";
import { Navbar } from "react-bootstrap";
import Thumbnail from "./Thumbnail";

const Video = (props) => {
  const _id = props.match.params.videoId;

  const [specificDate, setSpecificDate] = useState("1");
  const options = {
    month: "long",
    year: "numeric",
    day: "numeric",
  };

  //   console.log(props);

  const [details, setDetails] = useState({
    videoname: "",
    description: "",
  });

  const [dates, setDates] = useState([]);

  const [data2, setData2] = useState([]);

  const getDate = (date) => {
    var date1 = new Date(); //current date
    var date2 = new Date(date);

    var difference = date1.getTime() - date2.getTime();

    var differenceWeeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));

    var differenceYears = Math.floor(
      difference / 1000 / 60 / 60 / 24 / 30 / 12
    );

    var differenceMonths = Math.floor(difference / 1000 / 60 / 60 / 24 / 30);

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);

    var minutesDifference = Math.floor(difference / 1000 / 60);

    var secondsDifference = Math.floor(difference / 1000);

    if (secondsDifference >= 60) {
      if (minutesDifference >= 60) {
        if (hoursDifference >= 24) {
          if (daysDifference >= 7) {
            if (differenceWeeks >= 4) {
              if (differenceMonths >= 12) {
                return differenceYears + " year ago";
              } else {
                return differenceMonths + " Months ago";
              }
            } else {
              return differenceWeeks + " weeks ago";
            }
          } else {
            return daysDifference + " days ago";
          }
        } else {
          return hoursDifference + " hours ago";
        }
      } else {
        return minutesDifference + " minutes ago";
      }
    } else {
      return secondsDifference + " seconds";
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/details2?id=${_id}`)
      .then((res) => {
        setDetails({
          videoname: res.data.videoname,
          description: res.data.description,
        });
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get("http://localhost:8000/details2")
      .then((res) => {
        console.log("hi2", res.data);

        var dataDuplicate = [];
        for (var i = 0; i < res.data.length; i++) {
          dataDuplicate = [
            ...dataDuplicate,
            {
              _id: res.data[i]._id,
              videoname: res.data[i].videoname,
              description: res.data[i].description,
              category: res.data[i].category,
              thumbnailpath: res.data[i].thumbnailpath,
            },
          ];
        }
        setData2(dataDuplicate);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get("http://localhost:8000/date")
      .then((res) => {
        console.log("heeyy");
        // console.log("date data", res.data[0].uploadDate);
        const clone = [];
        res.data.forEach((data) => {
          //   console.log(data.uploadDate.toString());
          clone.push(data.uploadDate);
          if (_id === data._id) {
            setSpecificDate(data.uploadDate);
          }
        });

        setDates(clone);
        console.log(dates);
        console.log("specific date", specificDate);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const src = `http://localhost:8000/video?id=${_id}`;

  return (
    <div style={{ backgroundColor: " #18181b" }}>
      <div className="navbar-custom-video">
        <h2 className="cafe-title1"> VIDEO CAFE </h2>
        <Link to={"/home/all"}>
          {" "}
          <button className="upld-btn">HOME</button>
        </Link>
      </div>
      <div className="video-main-div">
        <div className="div--1">
          <video
            key={_id}
            id="videoPlayer"
            controls
            muted="muted"
            className="video-screen"
          >
            <source src={src} type="video/mp4" />
          </video>
          <div className="detail--div">
            <h4 className="video---title">{details.videoname}</h4>
            <h4 className="video---desc">{details.description}</h4>
            <h4 className="video---desc" style={{ fontSize: "1.4rem" }}>
              Uploaded On{" "}
              {new Date(specificDate).toLocaleDateString(undefined, options)}
            </h4>
          </div>
        </div>
        <div className="div--2">
          {data2.map((element, index) => {
            if (data2.length === 0) {
            } else {
              return (
                <div className="card-video">
                  <Link
                    to={`/video/${element._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Thumbnail
                      thumbnailpath={element.thumbnailpath}
                      key={index}
                    />
                    <div style={{ marginLeft: "0.5rem" }}>
                      <h4 className="video--title">{element.videoname}</h4>

                      <p className="category">{element.category}</p>
                      <p className="date">{getDate(dates[index])}</p>
                    </div>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Video;
