import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }

    //after creation,updation

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <>
      <div className="mainClass">
        <div className="pasteDiv">
          <input
            id="homeInput"
            onChange={(e) => setTitle(e.target.value)}
            type="text" //Title ko Track Karta he
            placeholder="Enter the title"
            value={title}
          />
          <button onClick={createPaste}>
            {pasteId ? "Update my Paste" : "Create a Paste"}
          </button>
        </div>

        <div>
          <textarea
            className="textArea"
            onChange={(e) => setValue(e.target.value)} //Value(content) track
            placeholder="Enter the Content Here"
            rows={20}
            value={value}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Home;
