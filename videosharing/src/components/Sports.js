import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Thumbnail from "./Thumbnail";

import axios from "axios";

const Sports = () => {
  const [data2, setData2] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/details2?category=Sports")
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
              thumbnailpath: res.data[i].thumbnailpath,
            },
          ];
        }
        setData2(dataDuplicate);
      })
      .catch((e) => {
        console.log(e);
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

                  <h4
                    style={{
                      fontSize: "1rem",
                      color: "black",
                    }}
                  >
                    {element.category}
                  </h4>
                </div>
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Sports;
