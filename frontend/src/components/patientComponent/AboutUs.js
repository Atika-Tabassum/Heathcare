import React from 'react'
import { Fragment } from 'react'
import Header from '../general/Header'

const AboutUs = () => {
    return <Fragment>
        <Header />
        <div className="page-container">
            <h1 align="center">
                About Us
            </h1>
            <div className="body-container">
                <p style={{lineHeight:'30px'}}>
                    We are a team of developers who are passionate about making healthcare more accessible to everyone.
                    Our goal is to provide a platform where patients can easily find doctors, hospitals, and other healthcare services.
                    We believe that everyone should have access to quality healthcare, and we are committed to making that a reality.

                    <br />
                    <br/>
                    Our project is a healthcare website <name style={{ color: '#991767' }}>CareConnect</name> designed to make it easier for doctors and patients to connect and access essential medical services. Here’s a breakdown of what our platform offers:

                    Patients and doctors can register on our website and create personalized profiles. Patients can browse a list of doctors and use filters to find specialists based on their needs. Once they find the right doctor, they can book appointments directly through the platform. There's also a section for finding hospitals, where patients can get detailed information about each hospital.

                    Doctors, on the other hand, can view and manage their appointment schedules. Additionally, they can organize free medical camps aimed at raising awareness or providing free medical services. They can invite other doctors to join the camp, who will receive notifications and can accept or decline the invitation. Doctors can also see who else is attending the camp, while patients can view these camps and book a spot to participate.

                    For mental health support, patients can directly text psychologists. They can also chat with other patients to get reviews about doctors. In case of emergencies, users can search for ambulances available in nearby hospitals. Different types of ambulances are listed, including AC, ICU, CCU, NICU, and freezing ambulances. Users can book an ambulance by providing their location and other necessary information.

                    Our platform also includes a blood donation feature. Users can indicate in their profile whether they are ready to donate blood. If a user needs blood, they can see a list of available donors sorted by blood group. They can view donor details and contact them for donations.

                    Overall, this platform aims to provide a comprehensive and user-friendly experience for managing healthcare needs, making it simpler for patients to access care and for doctors to offer their services efficiently.
                </p>
                <div style={{ paddingTop: '30px', fontSize: '14px',paddingBottom:'70px' }}>
                    <h2>Team Members:</h2>
                    <ul>
                        <li>
                            <b>Anika Morshed</b>
                            <p>
                                CSE, BUET
                            </p>
                        </li>
                        <li>
                            <b>Atika Tabassum Suchi</b>
                            <p>
                                CSE, BUET
                            </p>
                        </li>
                        <li>
                            <b>Fariha Ifrat</b>
                            <p>
                                CSE, BUET
                            </p>
                        </li>
                        <li>
                            <b>Nabiha Tahseen Promi</b>
                            <p>
                                CSE, BUET
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Fragment>
}

export default AboutUs