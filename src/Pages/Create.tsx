import { Button } from "antd";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Album from "../components/Album";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import { db, storage } from "../firebase/firebase";
import { IAlbum } from "../interfaces/IAlbum";
import { IProfile } from "../interfaces/IProfile";
import { RootState } from "../reducers";

const Create: FC = () => {
  const [file, setFile] = useState<any>(null);
  const [url, setUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [albumName, setAlbumName] = useState<string>("");
  const storageRef = ref(storage, "images/" + file?.name);
  const navigate = useNavigate();
  const user_profile: IProfile = useSelector((state: RootState) => {
    return state.user_profile;
  });
  const types: String[] = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  const preview_album: IAlbum = {
    title: albumName !== "" ? albumName : "--- ---- --- --- ---",
    id: albumName.toLocaleLowerCase(),
    photos: [],
    thumb: url,
    date: "15 April, 2022",
  };
  const metadata = {
    contentType: "image/jpeg",
  };
  const docRef = doc(db, "users", user_profile.uid);
  const upload_to_server = (): void => {
    if (albumName !== "" && file) {
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setUploading(true);
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
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
              timestamp: new Date(),
            }),
          });
          setUploading(false);
          setAlbumName("");
          navigate(`/album/${preview_album.id}`);
        }
      );
    }
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
      setError("Please select a image file (jpg, png, gif or jpeg)");
      console.log("failed");
    }
  };
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setUrl("");
    }
  }, [file]);
  return (
    <section className="create">
      <Header
        upper={
          <>
            <h2>Create Album</h2>
          </>
        }
        down={
          <>
            <p className="pt-2">Create an album to store your memories 🚀</p>
          </>
        }
      />
      <main className="create-form-wrapper d-flex align-items-center mt-3 p-5 mx-2">
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
        <div className="form-wrap w-50">
          <p className="mb-4 border-bottom w-75 pb-2">Set album info</p>
          <form
            className="w-75 d-flex flex-column gap-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label>
              <input
                required
                value={albumName}
                onChange={(e) => {
                  setAlbumName(e.target.value);
                }}
                type="text"
              />
              <span>Album name</span>
            </label>
            <label>
              <div className="uploader-wrpper">
                <input onChange={uploader} type="file" />
                {error !== "" && <p className="error">{error}</p>}
              </div>
            </label>
            {uploading && <ProgressBar progress={progress} />}
            <div className="d-flex gap-3">
              <Button size="large" className="btn-secondary">
                Cancel
              </Button>
              <Button
                htmlType="submit"
                size="large"
                className="btn-primary"
                onClick={() => {
                  upload_to_server();
                }}
              >
                Create
              </Button>
            </div>
          </form>
        </div>
        <div className="preview w-50 h-100">
          <p className="mb-3">Preview</p>
          <Album isPreviewMode={true} album={preview_album} />
        </div>
      </main>
    </section>
  );
};

export default Create;
