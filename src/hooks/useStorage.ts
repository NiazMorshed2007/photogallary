import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { URL } from "url";
import { storage } from "../firebase/firebase";


const useStorage = (file: File) => {
    const [progress, setProgress] = useState<number>(0);
    const [storageErr, setStorageErr] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const storageRef = ref(storage, "images/" + file?.name);
    const metadata = {
      contentType: "image/jpeg",
    };
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    useEffect(() => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const bytes_gone =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + bytes_gone + "% done");
              setProgress(bytes_gone);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case "storage/unauthorized":
                  setStorageErr("User doesn't have permission to access the object");
                  break;
                case "storage/canceled":
                  // User canceled the upload
                  break;
      
                // ...
      
                case "storage/unknown":
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUrl(downloadURL);
              });
            }
          );
    },[file]);
    return {url, progress, storageErr};
}

export default useStorage;