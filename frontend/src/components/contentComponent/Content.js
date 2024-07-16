import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./Content.css";
import Header from "../../components/general/Header";
import { Fragment } from "react";

const Content = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/contents`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setContent(data.data);
          setTopics(data.topics);
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
    <body style={{ margin: '90px' }}>
      <section>
        <h1>Contents</h1>
        <div className="video-container">
          {/* <ul>
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
          </ul> */}
          <div className="video-grid">
            {
              Array.isArray(topics) ?
                (
                  topics.map((topic, index) => {
                    const filteredContent = content.filter(item => item.topic === topic);
                    { console.log(filteredContent) }
                    return (
                      <div key={index}>
                        <div>
                          <ul className="list">
                            <li>
                              <h2>{topic}</h2>
                            </li>
                          </ul>
                        </div>
                        <div className="topic-wise-video">
                          {
                            filteredContent.length > 0 ? (
                              filteredContent.map((item) => (
                                <div key={item.content_id}>
                                  <p>{item.description}</p>
                                  <ReactPlayer url={item.video} controls={true} width="700px" height="400px" />
                                </div>
                              ))
                            ) : (
                              <p>No content available for this topic</p>
                            )
                          }
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No content available</p>
                )
            }
          </div>
        </div>
      </section>
    </body>

  </Fragment>

};

export default Content;
