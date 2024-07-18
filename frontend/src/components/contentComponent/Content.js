import React, { useState, useEffect, Fragment } from "react";
import ReactPlayer from "react-player";
import "./Content.css";
import Header1 from "../general/header1";

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

  return (
    <Fragment>
      <Header1></Header1>
      <section>
        <h1 align='center'><i>Contents</i></h1>
        <div className="content">
          <ul>
            {Array.isArray(content) ? (
              content.map((item) => (
                <li key={item.content_id}>
                  <h4>{item.topic}</h4>
                  <p>{item.description}</p>
                  <ReactPlayer
                    url={item.video}
                    controls={true}
                    width="100%"
                    height="250px"
                  />
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
    </Fragment>
  );
};

export default Content;
