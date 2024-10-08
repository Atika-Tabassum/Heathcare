import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Header from "../general/Header";
import "../homeComponent/homepage.css";
import "../homeComponent/page.css";
import "../general/general.css";
import './patient.css';
import userimg from '../general/user.svg'
import edit from '../general/edit.svg'
import cancel from '../general/cancel.svg'
import image5 from "../general/blooddonate.svg";

const Profile = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const makeAddress = (user) => {
    const addressFields = [
      user.division_name,
      user.district_name,
      user.upazila_name,
      user.union_name,
      user.ward_name,
      user.village_name,
      user.street_address,
      user.postal_code
    ];

    const fullAddress = addressFields.filter(field => field).join(", ");
    return fullAddress;
  }

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/myprofile`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await response.json();
      setUser(data.data[0]);
      console.log(data.data[0]);
      setEmail(data.data[0].email);
      setName(data.data[0].name);
      setPassword(data.data[0].password);
      setContactNo(data.data[0].contact_no);
      const fullAddress = makeAddress(data.data[0]);
      setAddress(fullAddress);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setIsLoading(false);
    }
  };

  const editFunc = () => {
    setIsEditClicked(!isEditClicked);
  }

  const saveEditFunc = () => {
    setIsEditClicked(!isEditClicked);
    const data = {
      name: name,
      email: email,
      password: password,
      contact_no: contactNo
    }
    fetch(`http://localhost:3001/healthcare/${userId}/updateprofile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      console.log('User updated');
    })
    window.location.reload();
  }

  const close = () => {
    setAddress(makeAddress(user));
    setEmail(user.email);
    setName(user.name);
    setPassword(user.password);
    setContactNo(user.contact_no);
    setIsEditClicked(!isEditClicked);
  }

  const goToBloodDonation = () => {
    // TODO: blood donation link fix
    window.location.href = "http://localhost:3000/showDonors";
  };

  const updateDonationStatus = async (status) => {
    try {
      console.log("frontend profile.js");
      const response = await fetch(`http://localhost:3001/bloodDonation/${userId}/updateDonationStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ will_donate_blood: status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update donation status");
      }
      const data = await response.json();
      setUser((prevUser) => ({ ...prevUser, will_donate_blood: status }));
    } catch (error) {
      console.error("Error updating donation status:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Header />

      <main>
        <div className='user-img'>
          <img className='img1' src={userimg} alt='user' />
        </div>
        <div className="patient-profile-container">
          <div className="patient-profile-card">
            {
              (!isEditClicked) ?
                <div className="not-clicked">
                  <img src={edit} alt="edit" className="edit-icon" onClick={editFunc} />
                  <div className="patient-name" >
                    {user.name}
                  </div>
                  <div className="patient-id"
                    style={{ margin: '20px 30px' }}>
                    <b>Patient ID: </b>{userId}
                  </div>
                  <div className="patient-email"
                    style={{ margin: '20px 30px' }}>
                    <b>E-mail: </b>{user.email}
                  </div>
                  <div className="patient-address"
                    style={{ margin: '20px 30px' }}>
                    <b>Address : </b>{address}
                  </div>
                  <div className="patient-contact"
                    style={{ margin: '20px 30px' }}>
                    <b>Contact No: </b>{user.contact_no || 'Not available'}
                  </div>
                  {
                    user.user_type === 'patient' ?
                      (
                        <div className="patient-medical-history"
                          style={{ margin: '20px 30px' }}>
                          <b>Medical History: </b>{user.medical_history || 'Not available'}
                        </div>
                      ) :
                      (
                        <></>
                      )
                  }

                  <div style={{ margin: '20px 30px' }}>
                    <p><b>Ready to Donate Blood? </b> {user.will_donate_blood ? "Yes" : "No"}</p>
                  </div>
                  <div className="blood--btn" style={{ display: "flex", justifyContent: "center", position: 'absolute', bottom: '20px' }}>
                    <label style={{ fontSize: "16px", fontFamily: 'Montserrat', fontWeight: '600' }}>Are you willing to donate blood?</label>
                    <button onClick={() => updateDonationStatus(true)} style={{ marginRight: "10px", padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#ff69b4", color: "#fff", border: "none", borderRadius: "5px", fontFamily: 'Montserrat' }}>Yes, I will donate</button>
                    <button onClick={() => updateDonationStatus(false)} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#ff69b4", color: "#fff", border: "none", borderRadius: "5px", fontFamily: 'Montserrat' }}>No, I won't donate</button>
                    <div className="blood-don" style={{ position: 'relative', paddingLeft: '350px' }}>
                      <img src={image5} onClick={goToBloodDonation} alt="blood-donation-img" className="blood-donation-img" style={{
                        height: '70px',
                        position: 'absolute', bottom: '30px', right: '10px', cursor: 'pointer',
                        borderStyle: 'inset',
                        borderWidth: '0.5px',
                        borderColor: 'black',
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
                      }} />
                      <div className="blood-don-tool-tip">Need Blood?</div>
                    </div>
                  </div>
                </div> :
                <div className="clicked">
                  <h1>Edit Profile</h1>
                  <div style={{ marginBottom: '20px' }}>
                    <label>Name : </label>
                    <input type="text" placeholder={user.name} style={{
                      fontFamily: 'Montserrat',
                      height: '20px',
                      width: '300px',
                      transitionTimingFunction: 'ease-in-out',
                      margin: '10px 0',
                      paddingLeft: '10px',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                      border: '1px solid lightgray',
                      borderRadius: '5px'
                    }} value={name} onChange={(e) => { setName(e.target.value) }} />
                  </div>
                  <div>
                    <label>Email : </label>
                    <input style={{
                      fontFamily: 'Montserrat',
                      height: '20px',
                      width: '300px',
                      transitionTimingFunction: 'ease-in-out',
                      margin: '10px 0',
                      paddingLeft: '10px',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                      border: '1px solid lightgray',
                      borderRadius: '5px'
                    }} type="text" placeholder={user.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div>
                    <label>Contact No : </label>
                    <input style={{
                      fontFamily: 'Montserrat',
                      height: '20px',
                      width: '300px',
                      transitionTimingFunction: 'ease-in-out',
                      margin: '10px 0',
                      paddingLeft: '10px',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                      border: '1px solid lightgray',
                      borderRadius: '5px'
                    }} type="text" placeholder={user.contact_no}
                      value={contactNo}
                      onChange={(e) => setContactNo(e.target.value)} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label>Password : </label>
                    <input type="password" placeholder="********" style={{
                      fontFamily: 'Montserrat',
                      height: '35px',
                      width: '300px',
                      transitionTimingFunction: 'ease-in-out',
                      margin: '10px 0',
                      paddingLeft: '10px',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                      border: '1px solid lightgray',
                      borderRadius: '5px',
                      paddingTop: '5px'
                    }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <img src={cancel} alt="cancel" className="cancel-icon" onClick={close} style={{ height: '25px' }} />
                  <button className="edit-button"
                    style={{
                      height: '30px', width: '100px', backgroundColor: 'lightcoral',
                      color: 'black', borderRadius: '5px', borderStyle: 'none',
                    }}
                    onClick={saveEditFunc}>Save</button>
                </div>
            }
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Profile;
