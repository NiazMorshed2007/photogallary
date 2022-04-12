import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { db, storage } from "../firebase/firebase";
import { IAlbum } from "../interfaces/IAlbum";
import { IProfile } from "../interfaces/IProfile";
import { RootState } from "../reducers";

const Create: FC = () => {
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [albumName, setAlbumName] = useState<string>("");
  const user_profile: IProfile = useSelector((state: RootState) => {
    return state.user_profile;
  });
  const [url, setUrl] = useState<string>("");
  const storageRef = ref(storage, "images/" + file?.name);
  const user_albums: IAlbum[] = useSelector((state: RootState) => {
    return state.user_albums;
  });
  const metadata = {
    contentType: "image/jpeg",
  };
  const docRef = doc(db, "users", user_profile.uid);
  const types: String[] = ["image/png", "image/jpg", "image/jpeg"];
  const upload_to_server = (): void => {
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
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
            // User doesn't have permission to access the object
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
      async () => {
        const URL = await getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            return downloadURL;
          }
        );
        updateDoc(docRef, {
          albums: arrayUnion({
            photos: [],
            thumb: URL,
            title: albumName,
            id: albumName.toLocaleLowerCase(),
            date: "skdf",
          }),
        });
      }
    );
  };
  const uploader = (e: any): void => {
    const selected: File = e.target.files[0];
    console.log(selected);

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
      console.log("success");
    } else {
      setFile(null);
      setError("Please select a image file (jpg, png or jpeg)");
      console.log("failed");
    }
  };
  return (
    <section className="create">
      <Header
        upper={
          <>
            <h2>Create Album</h2>
          </>
        }
        down={<></>}
      />
      <main className="create-form-wrapper p-5 mx-2">
        {/* <Form form={form}>
          <Form.Item>
            <Input />
          </Form.Item>
          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="longgggggggggggggggggggggggggggggggggg"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<BsUpload />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            required
            value={albumName}
            onChange={(e) => {
              setAlbumName(e.target.value);
            }}
            type="text"
          />
          <div className="uploader-wrpper">
            <input onChange={uploader} type="file" />
            {file && <p>{file.name}</p>}
            {error !== "" && <p>{error}</p>}
          </div>
          <button
            onClick={() => {
              upload_to_server();
            }}
          >
            ok
          </button>
        </form>
        <p>{url}</p>
      </main>
    </section>
  );
};

export default Create;
