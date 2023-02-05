import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function handleUpload() {
  if (!file) {
    alert("Please choose a file first!");
  }
  const storageRef = ref(storage, `/files/${file.name}`);
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
        // console.log(url);
      });
    }
  );
}
