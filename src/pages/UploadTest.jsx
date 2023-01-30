//add useState for handling the image as a file and then the image as a url from firebase
import React, { useState } from "react";
import storage from "../utilities/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//add import for storage
const UploadTest = () => {
  const allInputs = { imgUrl: "" };

  const [imageAsFile, setImageAsFile] = useState("");

  const [percent, setPercent] = useState(0);

  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  console.log(imageAsFile);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Please upload an image first!");
    }

    setImageAsFile((imageFile) => file);

    const storageRef = ref(storage, `/files/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("URL: ", url);
        });
      }
    );
  };

  return (
    <div className="App">
      {/* //form for handling file upload */}
      <form>
        <input
          // allows you to reach into your file directory and upload image to the browser
          type="file"
          onChange={handleUpload}
        />
      </form>
    </div>
  );
};

export default UploadTest;
