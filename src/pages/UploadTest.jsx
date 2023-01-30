//add useState for handling the image as a file and then the image as a url from firebase
import React, { useState } from 'react'
import { storage } from "../utilities/firebase";
//add import for storage 
const UploadTest = () => {
  const allInputs = { imgUrl: '' }
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allImputs)
  console.log(imageAsFile)
  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
  }
  return (
    <div className="App">
      //form for handling file upload
      <form>
        <input
          // allows you to reach into your file directory and upload image to the browser
          type="file"
          onChange={handleImageAsFile}
        />
      </form>

    </div>
  );
}

export default UploadTest;