import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../general/Header";
import img1 from "../homeComponent/about-us.svg";
import img2 from "../homeComponent/contact-us.svg";
import "./Appointment.css";

const Appointment = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [appointments, setAppointments] = useState([]);

  const myProfile = () => {
    navigate(`/${userId}/myprofile`);
  };

  const handleNotifications = () => {
    navigate(`/${userId}/notifications`);
  };

  const updateStatus = async (appointment_id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/doctors/updatestatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ appointment_id }),
        }
      );
      const data = await response.json();
      if (data.message === "Appointment status updated successfully") {
        window.location.reload();
      } else {
        console.error("Error updating status:", data);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/doctors/${userId}/viewappointments`
      );
      const data = await response.json();
      if (Array.isArray(data.data)) {
        console.log(data.data);
        setAppointments(data.data);
      } else {
        console.error("Expected an array but received:", data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <Fragment>
      <Header />
      <navbar className="navbar">
        <div className="navbar-icons">
          <img src={img2} alt="contact us" className="contact-us-icon" />
          <div className="tool-tip">Contact Us</div>
        </div>
      </navbar>

      <navbar className="navbar2">
        <div className="bottom-icon">
          <img src={img1} alt="about us" className="about-us-icon" />
          <div className="tool-tip">About Us</div>
        </div>
      </navbar>

      <div className="page-container">
        <h1 align="center">
          <i>Appointments</i>
        </h1>
        <div className="table-container">
          <div className="text_alignment">
            <table>
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Patient Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.appointment_id} text-align="center">
                    <td>{appointment.appointment_id}</td>
                    <td>{appointment.patient_name}</td>
                    <td>{appointment.appointment_date}</td>
                    <td className="button--class">
                      {appointment.status === "pending" ? (
                        <button
                          className="app-btn"
                          style={{ backgroundColor: "lightgreen" }}
                          onClick={() => {
                            updateStatus(appointment.appointment_id);
                          }}
                        >
                          Accept
                        </button>
                      ) : (
                        <button
                          className="app-btn"
                          style={{ backgroundColor: "gray" }}
                          disabled
                        >
                          Accepted
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Appointment;
