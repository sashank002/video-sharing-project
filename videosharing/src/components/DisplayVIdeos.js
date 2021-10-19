import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Video from "./Video";

const Display = () => {
  const [data1, setData1] = useState([]);

  const [data2, setData2] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/details1")
      .then((res) => {
        //console.log('hi1', res.data)

        var dataDuplicate = [];
        for (var i = 0; i < res.data.length; i++) {
          dataDuplicate = [...dataDuplicate, res.data[i].filename];
        }
        setData1(dataDuplicate);
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
              videoname: res.data[i].videoname,
              description: res.data[i].description,
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
    <div>
      <h1>display screen</h1>
      {data1.map((element, index) => {
        if (data2.length === 0) {
        } else {
          return (
            <div>
              <Video filename={element} key={index} />
              <h4>{data2[index].videoname}</h4>
              <h4>{data2[index].description}</h4>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Display;
