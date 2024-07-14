CREATE DATABASE Healthcare;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contact_no VARCHAR(20),
    address VARCHAR(255),
    user_type VARCHAR(50), -- 'doctor', 'patient', 'hospital'
    password VARCHAR(255)
);


CREATE TABLE doctors (
    doctor_user_id INTEGER PRIMARY KEY,
    specialisation VARCHAR(100),
    hospital_user_id INTEGER,
    description TEXT,
    FOREIGN KEY (doctor_user_id) REFERENCES users(user_id),
    FOREIGN KEY (hospital_user_id) REFERENCES users(user_id)
);

CREATE TABLE patients (
    patient_user_id INTEGER PRIMARY KEY,
    medical_history TEXT,
    FOREIGN KEY (patient_user_id) REFERENCES users(user_id)
);

CREATE TABLE hospitals (
    hospital_user_id INTEGER PRIMARY KEY,
    description VARCHAR(255),
    image VARCHAR(255),
    FOREIGN KEY (hospital_user_id) REFERENCES users(user_id)
);

CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_user_id INTEGER,
    doctor_user_id INTEGER,
    appointment_date TIMESTAMP,
    FOREIGN KEY (patient_user_id) REFERENCES users(user_id),
    FOREIGN KEY (doctor_user_id) REFERENCES users(user_id)
);

CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE ambulance_bookings (
    booking_id SERIAL PRIMARY KEY,
    patient_user_id INTEGER,
    hospital_user_id INTEGER,
    booking_date TIMESTAMP,
    is_booked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (patient_user_id) REFERENCES users(user_id),
    FOREIGN KEY (hospital_user_id) REFERENCES users(user_id)
);


CREATE TABLE medical_camps (
    camp_id SERIAL PRIMARY KEY,
    doctor_user_id INTEGER,
    location VARCHAR(255),
    camp_date TIMESTAMP,
    description TEXT,
    FOREIGN KEY (doctor_user_id) REFERENCES users(user_id)
);

CREATE TABLE medical_camp_doctors (
    camp_id INTEGER,
    doctor_user_id INTEGER,
    FOREIGN KEY (doctor_user_id) REFERENCES users(user_id),
    FOREIGN KEY (camp_id) REFERENCES medical_camps(camp_id)
);

CREATE TABLE medical_camp_patients (
    camp_id INTEGER,
    patient_user_id INTEGER,
    FOREIGN KEY (patient_user_id) REFERENCES users(user_id),
    FOREIGN KEY (camp_id) REFERENCES medical_camps(camp_id)
);

CREATE TABLE content(
    content_id SERIAL PRIMARY KEY,
    topic VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    video VARCHAR(255)
);


INSERT INTO users (NAME, EMAIL,CONTACT_NO,ADDRESS, PASSWORD, USER_TYPE)
VALUES ('John Doe', 'john.doe@example.com','01345678989','buet', 'password123', 'patient');


INSERT INTO content (topic, description, video) 
VALUES ('Hygiene', '10 Steps to Washing Your Hands.',  'https://youtu.be/Br4sQmiJ1jU?si=3lvqP2u3OjoAyc66');
--fariha
CREATE TABLE specializations (
    specialization_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);
CREATE TABLE doctor_specializations (
    doctor_user_id INTEGER,
    specialization_id INTEGER,
    FOREIGN KEY (doctor_user_id) REFERENCES doctors(doctor_user_id),
    FOREIGN KEY (specialization_id) REFERENCES specializations(specialization_id),
    PRIMARY KEY (doctor_user_id, specialization_id)
);
ALTER TABLE doctors ADD COLUMN image VARCHAR(100); 
ALTER TABLE doctors
DROP COLUMN specialisation;
INSERT INTO users (name, email, contact_no, address, user_type, password) VALUES
  ('Dr. John Smith', 'john.smith@example.com', '1234567890', '123 Main St, City, Country', 'doctor', 'password123'),
  ('Dr. Emily Brown', 'emily.brown@example.com', '9876543210', '456 Park Ave, Town, Country', 'doctor', 'securepass'),
  ('City Hospital', 'city.hospital@example.com', '1112223333', '789 Elm St, City, Country', 'hospital', 'hospital123');
;
INSERT INTO doctors (doctor_user_id, image, hospital_user_id, description) VALUES
  (1, 'doctor1.jpg', 3, 'Experienced cardiologist with over 10 years of practice.'),
  (2, 'doctor2.jpg', 3, 'Specializes in pediatrics and child healthcare.');
INSERT INTO specializations (name) VALUES
  ('Cardiology'),
  ('Dermatology'),
  ('Neurology'),
  ('Pediatrics'),
  ('Psychiatry'),
  ('Orthopedics'),
  ('Ophthalmology');

  

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contact_no VARCHAR(20),
    address VARCHAR(255),
    user_type VARCHAR(50), -- 'doctor', 'patient', 'hospital'
    password VARCHAR(255)
);


CREATE TABLE doctors (
    doctor_user_id INTEGER PRIMARY KEY,
    specialisation VARCHAR(100),
    hospital_user_id INTEGER,
    description TEXT,
    FOREIGN KEY (doctor_user_id) REFERENCES users(user_id),
    FOREIGN KEY (hospital_user_id) REFERENCES users(user_id)
);


CREATE TABLE patients (
    patient_user_id INTEGER PRIMARY KEY,
    medical_history TEXT,
    FOREIGN KEY (patient_user_id) REFERENCES users(user_id)
);

CREATE TABLE hospitals (
    hospital_user_id INTEGER PRIMARY KEY,
    description VARCHAR(255),
    image VARCHAR(255),
    FOREIGN KEY (hospital_user_id) REFERENCES users(user_id)
);

CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_user_id INTEGER,
    doctor_user_id INTEGER,
    appointment_date TIMESTAMP,
    FOREIGN KEY (patient_user_id) REFERENCES users(user_id),
    FOREIGN KEY (doctor_user_id) REFERENCES users(user_id)
);

CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    camp_id INTEGER, ---pore add korsi
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    type VARCHAR(50), ---pore add korsi
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (camp_id) REFERENCES medical_camps(camp_id)  ---pore add korsi
);



-- sql
-- alter table notifications add column type varchar(50);


CREATE TABLE ambulance_bookings (
    booking_id SERIAL PRIMARY KEY,
    patient_user_id INTEGER,
    hospital_user_id INTEGER,
    booking_date TIMESTAMP,
    is_booked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (patient_user_id) REFERENCES users(user_id),
    FOREIGN KEY (hospital_user_id) REFERENCES users(user_id)
);

INSERT INTO ambulance_bookings (patient_user_id, hospital_user_id, booking_date, is_booked) VALUES (1, 2, '2021-07-01 10:00:00', TRUE);


CREATE TABLE medical_camps (
    camp_id SERIAL PRIMARY KEY,
    doctor_user_id INTEGER,
    location VARCHAR(255),
    camp_date TIMESTAMP,
    description TEXT,
    image bytea, --pore add korsi
    FOREIGN KEY (doctor_user_id) REFERENCES users(user_id)
);

--  alter table medical_camps add column image bytea;

-- \lo_import "C:/Users/User/Documents/hackathon/camp_default_img.jpg"
-- return the oid of the image
-- update medical_camps set image = lo_get(oid) ;

CREATE TABLE medical_camp_doctors (
    camp_id INTEGER,
    doctor_user_id INTEGER,
    FOREIGN KEY (doctor_user_id) REFERENCES users(user_id),
    FOREIGN KEY (camp_id) REFERENCES medical_camps(camp_id)
);

CREATE TABLE medical_camp_patients (
    camp_id INTEGER,
    patient_user_id INTEGER,
    FOREIGN KEY (patient_user_id) REFERENCES users(user_id),
    FOREIGN KEY (camp_id) REFERENCES medical_camps(camp_id)
);

CREATE TABLE content(
    content_id SERIAL PRIMARY KEY,
    topic VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    video VARCHAR(255)
);


CREATE TABLE ambulance (
    ambulance_id SERIAL PRIMARY KEY,
    hospital_user_id INTEGER,
    type VARCHAR(50), -- 'AC', 'ICU', 'CCU', 'NICU', 'Freezing'
    count INTEGER,
    FOREIGN KEY (hospital_user_id) REFERENCES hospitals(hospital_user_id)
);


INSERT INTO users (NAME, EMAIL,CONTACT_NO,ADDRESS, PASSWORD, USER_TYPE) VALUES ('doctor1', 'doctor1@mail.com', '01345678989', 'buet', 'password123', 'doctor');



INSERT INTO users (NAME, EMAIL,CONTACT_NO,ADDRESS, PASSWORD, USER_TYPE)
VALUES ('John Doe', 'john.doe@example.com','01345678989','buet', 'password123', 'patient');

INSERT INTO doctors (doctor_user_id, specialisation, hospital_user_id, description) VALUES (379, 'Cardiologist', 265, 'Dr. doctor1 is a cardiologist with 10 years of experience.');


INSERT INTO users(name, email, contact_no, address, password, user_type) values('Square Hospitals Ltd.', 'https://www.squarehospital.com/', '+8809610010616', 'Nafi Tower, Level-3 (2nd floor),53 Gulshan Avenue, Gulshan-1, Dhaka-
INSERT INTO content (topic, description, video) 
VALUES ('Hygiene', '10 Steps to Washing Your Hands.',  'https://youtu.be/Br4sQmiJ1jU?si=3lvqP2u3OjoAyc66');



INSERT INTO users(name, email, contact_no, address, password, user_type) values('Square Hospitals Ltd.', 'square@mail', '+8809610010616', 'Nafi Tower, Level-3 (2nd floor),53 Gulshan Avenue, Gulshan-1, Dhaka-
 1212','1234', 'hospital');

INSERT INTO users (name, address, user_type) VALUES
('Anwer Khan Modern Medical College', 'Dhanmondi, Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Aichi Hospital', 'Dhaka', 'hospital'),
INSERT INTO users (name, address, user_type) VALUES
('Arif Memorial Hospital', 'Barishal', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Al Haramain Hospital', 'Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Ambia Memorial Hospital', 'Barisal', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('AMZ Hospital Ltd.', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Anwer Khan Modern Hospital Ltd', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Aysha Memorial Specialised Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Bangladesh Neonatal Hospital', 'Signboard Mor, Narayanganj', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Bangabandhu Memorial Hospital (BBMH)', 'Chittagong', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Bangabandhu Sheikh Mujib Medical University', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Bangladesh College of Nursing', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Bangladesh Eye Hospital Limited', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Bangladesh Medical College Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Bangladesh Specialized Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Bangladesh Spine & Orthopaedic General Hospital Ltd', 'Panthapath, Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Basundhura Hospital (Pvt.) Ltd.', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('BGB Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Bangladesh Institute of Research and Rehabilitation for Diabetes, Endocrine and Metabolic Disorders (BIRDEM)', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('BRB Hospital', 'Panthapath, Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Cardio Care Specialized and General Hospital Ltd', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Care Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Care Zone Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Catharsis Medical Centre Limited', 'Gazipur', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Central Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Chander Hasi Hospital Limited', 'Habiganj, Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Chittagong Eye Infirmary and Training Hospital', 'Chittagong', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Chittagong Maa-O-Shishu Hospital', 'Chittagong', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Chittagong Diabetic General Hospital', 'Chittagong', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Chittagong Medical College Hospital', 'Chittagong', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('CMH (Combined Military Hospital)', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Comilla Medical College Hospital', 'Comilla', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Continental Hospital Ltd.', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Dhaka Central International Medical College Hospital', 'Adabor, Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Dhaka Community Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Dhaka Dental College and Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Dhaka Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Dhaka Medical College & Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Dhaka National Medical College And Hospital Institute', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Dhaka Shishu Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Dinajpur Medical College Hospital', 'Dinajpur', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Dr. Alauddin Ahmed Clinic', 'Jhalakati', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Duwell Medical', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Eastern Hospital & Medical Research Centre', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Esperto Health Care & Research Center', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Farazy Hospital Ltd', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Farazy Dental Hospital & Research Center', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Gazi Medical College Hospital', 'Khulna', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Genuine Cancer Hospital Limited', 'Chittagong', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Gonoshasthaya Nagar Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Government Homeopathic Medical College Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Greenland Hospital Limited', 'Sector - 10, Uttara, Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Holy Family Red Crescent Medical College Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Ibn Sina Hospital Sylhet Ltd', 'Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Ibn Sina Hospitals', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Institute of Child and Mother Health', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Institute of Laser Surgery & Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Ispahani Islamia Eye Institute and Hospital (IIEI&H)', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Japan East West Medical College Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Khwaja Yunus Ali Medical College and Hospital', 'Sirajganj', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Khulna Medical College Hospital', 'Khulna', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Kumudini Hospital', 'Tangail', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Kuwait Bangladesh Friendship Govt. Hospital', 'Uttara, Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Labaid Cardiac Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Labaid Specialized Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Maa Nursing Home & Diagnostic Centre', 'Tangail', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Medinova Medical Services Ltd.', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('MH Samorita Hospital & Medical College', 'Love Road, Tejgaon, Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Mikrani Dental Banasree Dhaka (Dental Hospital)', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Mojibunnessa Eye Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Moulana Bhasani Medical College Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Mount Adora Hospital', 'Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Mental Hospital', 'Pabna', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Mymensingh Medical College Hospital', 'Mymensingh', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('National Hospital Chattagram', 'Chattagram', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('National Heart Foundation', 'Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('National Institute of Cardiovascular Diseases', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('National Institute of Ear, Nose and Throat', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('National Institute of Kidney Disease & Urology', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('National Institute of Mental Health', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('National Institute of Mental Health and Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('National Institute of Neuroscience', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('National Institute of Opthalmology and Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('National Institute of Preventive and Social Medicine', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('North East Medical College and Hospital', 'Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Nurjahan Hospital Ltd', 'Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Oasis Hospital (Pvt) Ltd', 'Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Sylhet, M.A.G Osmani Medical College and Hospital', 'Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Pongu Hospital Jessore', 'Railget, Mujib Sarak, Jessore, Bangladesh', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Popular Specialized Hospital Ltd.', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Rajshahi Medical College Hospital', 'Rajshahi', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Rangpur Medical College Hospital', 'Rangpur', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Rashmono General Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Royal Hospital and Research Center Ltd.', 'Chittagong', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Saint Martin Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Samorita Hospital Ltd.', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Shaheed Monsur Ali Medical College Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Shaheed Ziaur Rahman Medical College Hospital', 'Bogra', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Shalahuddin Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Sheikh Fazilatunnessa Mujib Memorial KPJ Specialized Hospital & Nursing College', 'Gazipur', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Sher-e-Bangla Medical College Hospital', 'Barisal', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Siddiqia Eye Foundation', 'Mymensingh', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Sir Salimullah Medical College & Mitford Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Square Hospital Ltd.', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Sylhet Eye Hospital & Laser Centre', 'Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Sylhet Maa O Shishu Hospital', 'Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Sylhet Medical College Hospital', 'Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('The Medical College for Women and Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Union Specialized Hospital Limited', 'Aftabnagor, Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Shaheed Ahsan Ullah Master General Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Shaheed Suhrawardy Medical College & Hospital', 'Dhaka', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Ayesha Haque Hospital', 'Beanibazar, Sylhet', 'hospital');
INSERT INTO users (name, address, user_type) VALUES
('Charkhai Multicare Hospital', 'Beanibazar', 'hospital');
--location tables
ALTER TABLE users DROP COLUMN address;
ALTER TABLE users ADD COLUMN location_id (INT);
CREATE TABLE divisions (
    division_id INTEGER PRIMARY KEY,
    division_name VARCHAR(255) NOT NULL
);
CREATE TABLE districts (
    district_id INTEGER PRIMARY KEY,
    district_name VARCHAR(255) NOT NULL,
    division_id INTEGER REFERENCES divisions(division_id) ON DELETE CASCADE
);
CREATE TABLE upazilas (
    upazila_id INTEGER PRIMARY KEY,
    upazila_name VARCHAR(255) NOT NULL,
    district_id INTEGER REFERENCES districts(district_id) ON DELETE CASCADE
);
