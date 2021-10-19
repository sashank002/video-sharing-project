import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Thumbnail from "./Thumbnail";

import axios from "axios";

const All = () => {
  // const [data1, setData1] = useState([])
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
          console.log(data.uploadDate.toString());
          clone.push(data.uploadDate);
        });

        setDates(clone);
        console.log(dates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {data2.map((element, index) => {
        if (data2.length === 0) {
        } else {
          return (
            <div className="custom-card">
              <Link
                to={`/video/${element._id}`}
                style={{ textDecoration: "none" }}
              >
                <Thumbnail thumbnailpath={element.thumbnailpath} key={index} />
                <div style={{ marginLeft: "0.5rem" }}>
                  <h4 className="video-title">{element.videoname}</h4>

                  <p className="category">{element.category}</p>
                  <p className="date">{getDate(dates[index])}</p>
                </div>
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default All;
