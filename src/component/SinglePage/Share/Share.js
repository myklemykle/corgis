import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { SmallCard } from "../../CorgiCard/Card";
import Modal from "../../utils/Modal";
import Button from "../../utils/Button";

export default ({ corgi, show, closeModal }) => {
  const [copied, setCopied] = useState(false);

  const shareOnTwitter = () => {
    // found on https://gist.github.com/McKinneyDigital/2884508#file-share-twitter-js
    let shareURL = "http://twitter.com/share?url="; //url base
    let params = {
      text: "This lovely corgi is mine",
      via: "NEARProtocol",
    };
    for (let prop in params)
      shareURL += "&" + prop + "=" + encodeURIComponent(params[prop]);
    window.open(
      shareURL,
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  const shareOnFacebook = () => {
    let shareURL = "https://www.facebook.com/sharer/sharer.php?"; //url base
    window.open(
      shareURL,
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  const address = window.location.origin + "/share" + window.location.hash;
  return (
    <Modal show={show} Close={closeModal}>
      <div style={{ width: "100%", height: "100%", marginBottom: "10px" }}>
        <h3>Share a Corgi</h3>
        <p>Click the card to see the share page</p>
        <div>
          <div style={{ overflowX: "scroll", width: "100%", height: "90%" }}>
            <Link
              to={{
                pathname: "/share",
                hash: corgi.id,
              }}
              key={corgi.id}
            >
              <SmallCard
                backgroundColor={corgi.backgroundColor}
                color={corgi.color}
                sausage={corgi.sausage}
                quote={corgi.quote}
              />
            </Link>
          </div>
          <p style={{ margin: "0" }}>{corgi.name}</p>
          <span style={{ color: "orange", fontSize: "0.7rem" }}>
            {corgi.rate}
          </span>
          <hr />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <p
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "4px 2px",
              wordWrap: "break-word",
            }}
          >
            {address}
          </p>
          <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
            <button
              style={{
                backgroundColor: "#fbb040",
                color: "#f2f2f2",
                borderRadius: "5px",
                padding: "4px 2px",
                cursor: "alias",
                boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
              }}
            >
              Copy Link
            </button>
          </CopyToClipboard>
          {copied && (
            <span style={{ color: "#961be0", marginLeft: "5px" }}>Copied.</span>
          )}
        </div>
        <div>
          <p style={{ color: "#999" }}>or share directly on</p>
          <div style={{ display: "flex", justifyContent: "space between" }}>
            <Button description="Twitter" action={shareOnTwitter} />
            <Button description="Facebook" action={shareOnFacebook} />
          </div>
        </div>
      </div>
    </Modal>
  );
};