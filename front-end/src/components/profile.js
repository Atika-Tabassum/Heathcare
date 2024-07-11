import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/myprofile`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await response.json();
      // console.log(data);
      setUser(data.data[0]);
      setName(data.data[0].name);
      setEmail(data.data[0].email);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>
        <b>Name:</b> {user.name}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
};

export default Profile;
