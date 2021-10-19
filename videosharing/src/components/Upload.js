import React, { useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { AiOutlinePlus } from "react-icons/ai";
import logo from "../images/logo-2.png";
import uploadImage from "../images/upload.png";
import "../css/Upload.css";

import bgVideo2 from "../images/bgVideo2.mp4";

const Upload = () => {
  const Catogory = [
    { value: 0, label: "News" },
    { value: 0, label: "Comedy" },
    { value: 0, label: "Movies" },
    { value: 0, label: "Gaming" },
    { value: 0, label: "Sports" },
    { value: 0, label: "Podcasts" },
    { value: 0, label: "Music" },
  ];

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles[0]) {
      alert("please choose video file only");
    } else {
      console.log(acceptedFiles[0]);
      setVideoFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "video/mp4",
  });

  const [videoFile, setVideoFile] = useState();
  const [details, setDetails] = useState({
    name: "",
    description: "",
    category: "News",
  });

  const handleName = (e) => {
    setDetails({ ...details, name: e.target.value });
  };

  const handleDescription = (e) => {
    setDetails({ ...details, description: e.target.value });
  };

  const handleCategories = (e) => {
    setDetails({ ...details, category: e.currentTarget.value });
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append("file", videoFile);

    axios
      .post(
        `http://localhost:8000/submit?videoname=${details.name}&videodescription=${details.description}&videocategory=${details.category}`,
        data
      )
      .then(function (response) {
        console.log(response);
        alert("video uploaded");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    // <div style={{ alignItems: "center", display: "flex", flexDirection: 'column' }}>
    //     <h1>You are in upload page</h1>

    //     <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    //         {...getRootProps()}
    //     >
    //         <input {...getInputProps()} />
    //         <AiOutlinePlus style={{ height: '50px', width: '50px' }} />

    //     </div>
    //     {videoFile ? <h1>"{videoFile.name}" selected</h1> : null}

    //     <form style={{ marginTop: '20px' }}>
    //         <label>Name: </label>
    //         <input type="text" id="fname" name="fname" placeholder="video name here" onChange={handleName} /><br />

    //         <label>Description: </label>
    //         <textarea style={{ resize: 'none' }} rows="5" cols="50" name="description" placeholder="description here.." onChange={handleDescription} >
    //         </textarea>
    //     </form>

    //     <button onClick={handleSubmit} style={{ height: '50px', width: '100px', backgroundColor: 'red', marginTop: '20px' }}>SUBMIT</button>
    //     <Link to={'/home'}> <button style={{ height: '50px', width: '100px', backgroundColor: 'red', marginTop: '20px' }}>HOME</button></Link>
    // </div >

    <div className="upload-container">
      <video autoPlay loop muted className="bgVideo">
        <source src={bgVideo2} type="video/mp4" />
      </video>

      <div className="u-container">
        <div className="left-div">
          <div className="left-logo-name-div">
            <img src={logo} />
            <p>VIDEO CAFE</p>
          </div>

          {/* <div className='left-image-div'>
                        <h1>picture here</h1>
                    </div> */}
        </div>

        <div className="right-div">
          <div className="right-form-div">
            <p className="right-form-div-title">Upload your video here!!</p>

            <div className="right-form-upload-icon-div" {...getRootProps()}>
              <input {...getInputProps()} />
              {/* <AiOutlinePlus style={{ height: '50px', width: '50px' }} /> */}
              <img src={uploadImage} />
            </div>
            {videoFile ? (
              <p className="selectedFileName">"{videoFile.name}" selected</p>
            ) : null}

            <form className="right-form-name-desc-div">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "1.5rem",
                }}
              >
                <label className="name">Name: </label>
                <input
                  className="nameInput"
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="video name here"
                  onChange={handleName}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "1.5rem",
                }}
              >
                <label className="name">Description: </label>
                <textarea
                  className="desInput"
                  rows="3"
                  cols="40"
                  name="description"
                  placeholder="description here.."
                  onChange={handleDescription}
                ></textarea>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <label className="name">Category: </label>
                <select className="categoryInput" onChange={handleCategories}>
                  {Catogory.map((item, index) => (
                    <option
                      key={index}
                      className="categorySelect"
                      value={item.label}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <div className="btn-div">
              <Link to="/home/all">
                <button className="upld-btn-reverse">Home</button>
              </Link>

              <button className="upld-btn-simple" onClick={handleSubmit}>
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* <h1 className="upload-title"> UPLOAD YOUR VIDEO</h1>
                <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <AiOutlinePlus style={{ height: '50px', width: '50px' }} />

                </div>
                {videoFile ? <h1>"{videoFile.name}" selected</h1> : null}


                <form className="form-control">
                    <div className="input-div">
                        <label className="name">Name: </label>
                        <input
                            className="nameInput"
                            type="text"
                            id="fname"
                            name="fname"
                            placeholder="video name here"
                            onChange={handleName}
                        />
                    </div>

                    <div className="input-div">
                        <label className="name">Description: </label>
                        <textarea
                            className="nameInput"
                            rows="5"
                            cols="40"
                            name="description"
                            placeholder="description here.."
                            onChange={handleDescription}
                        ></textarea>
                    </div>
                </form>

                <select onChange={handleCategories}>
                    {Catogory.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>

                <div className="btn-div">
                    <button className="upload--btn" onClick={handleSubmit}>
                        Upload
                    </button>

                    <Link to="/home">
                        {" "}
                        <button className="upload--btn">skip</button>
                    </Link>
                </div> */}
      </div>

      <div className="div-2"></div>
    </div>
  );
};

export default Upload;
