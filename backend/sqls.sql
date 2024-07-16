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

INSERT INTO medical_camp_doctors (camp_id, doctor_user_id) VALUES (1, 379);
INSERT INTO medical_camp_doctors (camp_id, doctor_user_id) VALUES (2, 380);
INSERT INTO medical_camp_doctors (camp_id, doctor_user_id) VALUES (1, 380);
INSERT INTO medical_camp_doctors (camp_id, doctor_user_id) VALUES (2, 379);

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

 CREATE TABLE book_ambulance (
    booking_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    type VARCHAR(50) NOT NULL,
    selectedHospital VARCHAR(100) NOT NULL
);

ALTER TABLE patients 
ADD COLUMN blood_group VARCHAR(3);

ALTER TABLE patients 
ADD COLUMN will_donate_blood BOOLEAN;

UPDATE patients 
SET blood_group = 'O+', 
    will_donate_blood = FALSE;
CREATE TABLE chats
(
    chat_id SERIAL PRIMARY KEY,
    sender_id INTEGER,
    receiver_id INTEGER,
    message TEXT,
    sent_at TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

-- INSERT INTO chats (sender_id, receiver_id, message, sent_at)
-- VALUES (117, 1, 'Hello, this is a test message', NOW());




INSERT INTO users (NAME, EMAIL,CONTACT_NO,ADDRESS, PASSWORD, USER_TYPE)
VALUES ('John Doe', 'john.doe@example.com','01345678989','buet', 'password123', 'patient');


INSERT INTO users (NAME, EMAIL,CONTACT_NO,ADDRESS, PASSWORD, USER_TYPE)
VALUES ('John Smith', 'smith@gmail.com","01345678989','buet', 'password123', 'patient');


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
    specialisation_id VARCHAR(100),
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

INSERT INTO medical_camps (doctor_user_id, location, camp_date, description) VALUES (1, 'Dhanmondi, Dhaka', '2021-07-01 10:00:00', 'Free medical camp for all.');
INSERT INTO medical_camps (doctor_user_id, location, camp_date, description) VALUES (1, 'du', '2021-07-01 10:00:00', 'Vaccination');
INSERT INTO medical_camps (doctor_user_id, location, camp_date, description) VALUES (379, 'Uttara', '2021-07-01 10:00:00', 'Free Diabetes Checkup Camp');
INSERT INTO medical_camps (doctor_user_id, location, camp_date, description) VALUES (380, 'BUET', '2021-07-01 10:00:00', 'Free Eye Checkup Camp');
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


INSERT INTO users(name, email, contact_no, address, password, user_type) values('Square Hospitals Ltd.', 'https://www.squarehospital.com/', '+8809610010616', 'Nafi Tower, Level-3 (2nd floor),53 Gulshan Avenue, Gulshan-1, Dhaka','1234', 'hospital');


INSERT INTO content (topic, description, video) 
VALUES ('Hygiene', '10 Steps to Washing Your Hands.',  'https://youtu.be/Br4sQmiJ1jU?si=3lvqP2u3OjoAyc66');


INSERT INTO content(topic, description, video) VALUES
('Hygiene', 'Hygiene Habits for Kids - Compilation - Handwashing, Personal Hygiene and Tooth Brushing', 'https://www.youtube.com/watch?v=l6XGE-Xuq3M&pp=ygUSaHlnaWVuZSB2aWRlbyBraWRz');

INSERT INTO content(topic, description, video) VALUES
('Mental Health', 'What Mental Health Is and Importance of Taking Care of It?', 'https://www.youtube.com/watch?v=tY8NY6CMDFA&pp=ygUWbWVudGFsIGhlYWx0aCBmb3Iga2lkcw%3D%3D');

-- https://i.ytimg.com/vi/tY8NY6CMDFA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAWAvwD548uZHaQH7-1X9VPVppTFw
-- https://www.youtube.com/watch?v=tY8NY6CMDFA&pp=ygUWbWVudGFsIGhlYWx0aCBmb3Iga2lkcw%3D%3D
-- What Mental Health Is and Why It’s Important to Take Care of It? - Kids Academy



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
CREATE TABLE location (
  location_id SERIAL PRIMARY KEY,
  division_id INT NOT NULL,
  district_id INT NOT NULL,
  upazila_id INT NOT NULL,
  union_name VARCHAR(255),
  ward_name VARCHAR(255),
  village_name VARCHAR(255),
  street_address VARCHAR(255),
  postal_code VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--doctor alters
ALTER TABLE doctors ADD COLUMN reg_no INT;
CREATE TABLE qualifications (
  qualification_id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE doctor_qualifications (
  doctor_qualification_id SERIAL PRIMARY KEY,
  doctor_user_id INT REFERENCES users(user_id),
  qualification_id INT REFERENCES qualifications(qualification_id),
  institution VARCHAR(255),
  year_of_completion INT
);


SELECT C.SENDER_ID,C.MESSAGE,C.SENT_AT,U.NAME AS CHAT_NAME
FROM CHATS C JOIN USERS U 
ON C.SENDER_ID=U.USER_ID 
WHERE C.RECEIVER_ID=1 AND C.SENDER_ID=117
UNION
SELECT C.SENDER_ID,C.MESSAGE,C.SENT_AT,U.NAME AS CHAT_NAME
FROM CHATS C JOIN USERS U
ON C.RECEIVER_ID=U.USER_ID
WHERE C.RECEIVER_ID=117 AND C.SENDER_ID=1;
----blogs
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE blog_posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER,
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
INSERT INTO blog_posts (post_id, title, content, category_id, author_id, created_at)
VALUES
    (1, 'Understanding Diabetes', 'Diabetes is a chronic condition...', 1, 1, NOW()),
    (2, 'Managing Hypertension', 'Hypertension, or high blood pressure...', 2, 1, NOW());

INSERT INTO blog_posts (post_id, title, content, category_id, author_id, created_at)
VALUES
    (1, 'Understanding Diabetes', 'Diabetes mellitus, often known simply as diabetes, is a group of common endocrine diseases characterized by sustained high blood sugar levels.[10][11] Diabetes is due to either the pancreas not producing enough insulin, or the cells of the body becoming unresponsive to the hormones effects.[12] Classic symptoms include thirst, polyuria, weight loss, and blurred vision. If left untreated, the disease can lead to various health complications, including disorders of the cardiovascular system, eye, kidney, and nerves.[3] Diabetes accounts for approximately 4.2 million deaths every year,[9] with an estimated 1.5 million caused by either untreated or poorly treated diabetes.[10]

The major types of diabetes are type 1 and type 2.[13] The most common treatment for type 1 is insulin replacement therapy (insulin injections), while anti-diabetic medications (such as metformin and semaglutide) and lifestyle modifications can be used to manage type 2. Gestational diabetes, a form that arises during pregnancy in some women, normally resolves shortly after delivery.

As of 2021, an estimated 537 million people had diabetes worldwide accounting for 10.5% of the adult population, with type 2 making up about 90% of all cases. It is estimated that by 2045, approximately 783 million adults, or 1 in 8, will be living with diabetes, representing a 46% increase from the current figures.[14] The prevalence of the disease continues to increase, most dramatically in low- and middle-income nations.[15] Rates are similar in women and men, with diabetes being the seventh leading cause of death globally.[16][17] The global expenditure on diabetes-related healthcare is an estimated US$760 billion a year.[18]

', 1, 1, NOW()),
    (2, 'Managing Hypertension', 'f you have high blood pressure, you may wonder if medication is necessary to bring the numbers down. But lifestyle plays a vital role in treating high blood pressure. Controlling blood pressure with a healthy lifestyle might prevent, delay or reduce the need for medication.

Here are 10 lifestyle changes that can lower blood pressure and keep it down.

1. Lose extra pounds and watch your waistline
Blood pressure often increases as weight increases. Being overweight also can cause disrupted breathing while you sleep (sleep apnea), which further raises blood pressure.

Weight loss is one of the most effective lifestyle changes for controlling blood pressure. If youre overweight or have obesity, losing even a small amount of weight can help reduce blood pressure. In general, blood pressure might go down by about 1 millimeter of mercury (mm Hg) with each kilogram (about 2.2 pounds) of weight lost.

Also, the size of the waistline is important. Carrying too much weight around the waist can increase the risk of high blood pressure.

In general:

Men are at risk if their waist measurement is greater than 40 inches (102 centimeters).
Women are at risk if their waist measurement is greater than 35 inches (89 centimeters).
These numbers vary among ethnic groups. Ask your health care provider about a healthy waist measurement for you.

2. Exercise regularly
Regular physical activity can lower high blood pressure by about 5 to 8 mm Hg. Its important to keep exercising to keep blood pressure from rising again. As a general goal, aim for at least 30 minutes of moderate physical activity every day.

Exercise can also help keep elevated blood pressure from turning into high blood pressure (hypertension). For those who have hypertension, regular physical activity can bring blood pressure down to safer levels.

Some examples of aerobic exercise that can help lower blood pressure include walking, jogging, cycling, swimming or dancing. Another possibility is high-intensity interval training. This type of training involves alternating short bursts of intense activity with periods of lighter activity.

Strength training also can help reduce blood pressure. Aim to include strength training exercises at least two days a week. Talk to a health care provider about developing an exercise program.

3. Eat a healthy diet
Eating a diet rich in whole grains, fruits, vegetables and low-fat dairy products and low in saturated fat and cholesterol can lower high blood pressure by up to 11 mm Hg. Examples of eating plans that can help control blood pressure are the Dietary Approaches to Stop Hypertension (DASH) diet and the Mediterranean diet.

Potassium in the diet can lessen the effects of salt (sodium) on blood pressure. The best sources of potassium are foods, such as fruits and vegetables, rather than supplements. Aim for 3,500 to 5,000 mg a day, which might lower blood pressure 4 to 5 mm Hg. Ask your care provider how much potassium you should have.

4. Reduce salt (sodium) in your diet
Even a small reduction of sodium in the diet can improve heart health and reduce high blood pressure by about 5 to 6 mm Hg.

The effect of sodium intake on blood pressure varies among groups of people. In general, limit sodium to 2,300 milligrams (mg) a day or less. However, a lower sodium intake — 1,500 mg a day or less — is ideal for most adults.

To reduce sodium in the diet:

Read food labels. Look for low-sodium versions of foods and beverages.
Eat fewer processed foods. Only a small amount of sodium occurs naturally in foods. Most sodium is added during processing.
Dont add salt. Use herbs or spices to add flavor to food.
Cook. Cooking lets you control the amount of sodium in the food.
5. Limit alcohol
Limiting alcohol to less than one drink a day for women or two drinks a day for men can help lower blood pressure by about 4 mm Hg. One drink equals 12 ounces of beer, 5 ounces of wine or 1.5 ounces of 80-proof liquor.

But drinking too much alcohol can raise blood pressure by several points. It can also reduce the effectiveness of blood pressure medications.

6. Quit smoking
Smoking increases blood pressure. Stopping smoking helps lower blood pressure. It can also reduce the risk of heart disease and improve overall health, possibly leading to a longer life.

7. Get a good nights sleep
Poor sleep quality — getting fewer than six hours of sleep every night for several weeks — can contribute to hypertension. A number of issues can disrupt sleep, including sleep apnea, restless leg syndrome and general sleeplessness (insomnia).

Let your health care provider know if you often have trouble sleeping. Finding and treating the cause can help improve sleep. However, if you dont have sleep apnea or restless leg syndrome, follow these simple tips for getting more restful sleep.

Stick to a sleep schedule. Go to bed and wake up the same time each day. Try to keep the same schedule on weeknights and on weekends.
Create a restful space. That means keeping the sleeping space cool, quiet and dark. Do something relaxing in the hour before bedtime. That might include taking a warm bath or doing relaxation exercises. Avoid bright light, such as from a TV or computer screen.
Watch what you eat and drink. Dont go to bed hungry or stuffed. Avoid large meals close to bedtime. Limit or avoid nicotine, caffeine and alcohol close to bedtime, as well.
Limit naps. For those who find napping during the day helpful, limiting naps to 30 minutes earlier in the day might help nighttime sleep.
8. Reduce stress
Long-term (chronic) emotional stress may contribute to high blood pressure. More research is needed on the effects of stress reduction techniques to find out whether they can reduce blood pressure.

However, it cant hurt to determine what causes stress, such as work, family, finances or illness, and find ways to reduce stress. Try the following:

Avoid trying to do too much. Plan your day and focus on your priorities. Learn to say no. Allow enough time to get done what needs to be done.
Focus on issues you can control and make plans to solve them. For an issue at work, talk to a supervisor. For conflict with kids or spouse, find ways to resolve it.
Avoid stress triggers. For example, if rush-hour traffic causes stress, travel at a different time or take public transportation. Avoid people who cause stress if possible.
Make time to relax. Take time each day to sit quietly and breathe deeply. Make time for enjoyable activities or hobbies, such as taking a walk, cooking or volunteering.
Practice gratitude. Expressing gratitude to others can help reduce stress.
9. Monitor your blood pressure at home and get regular checkups
Home monitoring can help you keep tabs on your blood pressure. It can make certain your medications and lifestyle changes are working.

Home blood pressure monitors are available widely and without a prescription. Talk to a health care provider about home monitoring before you get started.

Regular visits with a provider are also key to controlling blood pressure. If your blood pressure is well controlled, ask your provider how often you need to check it. You might be able to check it only once a day or less often.

10. Get support
Supportive family and friends are important to good health. They may encourage you to take care of yourself, drive you to the care providers office or start an exercise program with you to keep your blood pressure low.

If you find you need support beyond your family and friends, consider joining a support group. This may put you in touch with people who can give you an emotional or morale boost and who can offer practical tips to cope with your condition.

 ', 2, 1, NOW());

