import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./Content.css";
import Header from "../../components/general/Header";
import { Fragment } from "react";

const Content = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/contents`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setContent(data.data);
        } else {
          console.error("Received data is not an array:", data);
        }
      })
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.log("Error received:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <Fragment>
    <Header />
    <body>
      <section>
        <h1>Contents</h1>
        <div className="video-grid">
          <ul>
            {Array.isArray(content) ? (
              content.map((item) => (
                <li key={item.content_id}>
                  <h2>{item.topic}</h2>
                  <p>{item.description}</p>
                  <ReactPlayer url={item.video} controls={true} width="100%" height="500px" />
                </li>
              ))
            ) : (
              <div>
                <p>No content available</p>
              </div>
            )}
          </ul>
        </div>
      </section>
    </body>

  </Fragment>

};

export default Content;
