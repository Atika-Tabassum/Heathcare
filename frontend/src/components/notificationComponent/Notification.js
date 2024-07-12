import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const userId = useParams().userId;
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const handleClick = async (campId, select) => {
    try {
      fetch(`http://localhost:3001/view/${userId}/${campId}/${select}/response`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            navigate(`/${userId}/myprofile`);
          } else {
            console.error("Failed to update response:", data);
          }
        });
    } catch (error) {
      console.error("Error occurred while updating response:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/view/${userId}/notifications`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setNotifications(data.data);
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
    <section>
      <h1>Notifications</h1>
      <ul>
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((item) => (
            <li key={item.notification_id}>
              {item.description}
              {item.type === "invitation" ? (
                <div>
                  <Link to={`/${item.camp_id}/camp_details`}>
                    <p>Learn More About the campaign</p>
                  </Link>
                  <button onClick={() => handleClick(item.camp_id, 1)}>
                    <p>Accept</p>
                  </button>
                  <button onClick={() => handleClick(item.camp_id, 0)}>
                    <p>Deny</p>
                  </button>
                </div>
              ) : (
                <p></p>
              )}
            </li>
          ))
        ) : (
          <div>
            <p>No notifications available</p>
          </div>
        )}
      </ul>
    </section>
  );
};

export default Notification;
