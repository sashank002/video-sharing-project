import React, { useEffect, useState } from "react";

const Thumbnail = ({ thumbnailpath }) => {
  //const src = `http://localhost:8000/videos?filename=${filename}`;
  // console.log(src)m
  return (
    <div style={{}}>
      {/* {console.log('in video i was in html component')} */}

      <img
        key={thumbnailpath}
        src={thumbnailpath}
        style={{
          width: 350,
          borderTopRightRadius: "10px",
          borderTopLeftRadius: "10px",
        }}
        alt="video"
      />
      {/* 
            <video key={filename} id="videoPlayer" width="650" controls muted="muted">
                <source src={src} type="image/png" />
            </video> */}
    </div>
  );
};

export default Thumbnail;
