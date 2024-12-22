import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  const url = window.location.href;
  return (
    <>
      <div className="pasteDiv">
        <input
          id="homeInput"
          onChange={(e) => setTitle(e.target.value)}
          type="text" //Title ko Track Karta he
          placeholder="Enter the title"
          disabled
          value={paste.title}
        />
        <CopyToClipboard text={url}>
          <button
            onClick={() => {
              toast.success("link Copied");
            }}
          >
            Share
          </button>
        </CopyToClipboard>
      </div>

      <div>
        <textarea
          className="textArea"
          disabled
          onChange={(e) => setValue(e.target.value)} //Value(content) track
          placeholder="Enter the Content Here"
          rows={20}
          value={paste.content}
        ></textarea>
      </div>
    </>
  );
};

export default ViewPaste;
