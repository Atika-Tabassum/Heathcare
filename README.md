Project Overview:

Our project, CareConnect, is a healthcare website designed to simplify the often overwhelming process of accessing medical services and information. Here's a breakdown of what our platform offers:

Patients and doctors can register on our website and create personalized profiles. Patients can browse a list of doctors and use filters to find specialists based on their needs. Once they find the right doctor, they can book appointments directly through the platform. There's also a section for finding hospitals, where patients can get detailed information about each hospital.

Doctors, on the other hand, can view and manage their appointment schedules. Additionally, they can organize free medical camps aimed at raising awareness or providing free medical services. They can invite other doctors to join the camp, who will receive notifications and can accept or decline the invitation. Doctors can also see who else is attending the camp, while patients can view these camps and book a spot to participate.

For mental health support, patients can directly text psychologists. They can also chat with other patients to get reviews about doctors. In case of emergencies, users can search for ambulances available in nearby hospitals. Different types of ambulances are listed, including AC, ICU, CCU, NICU, and freezing ambulances. Users can book an ambulance by providing their location and other necessary information.

Our platform also includes a blood donation feature. Users can indicate in their profile whether they are ready to donate blood. If a user needs blood, they can see a list of available donors sorted by blood group. They can view donor details and contact them for donations.




Setup Instructions:

Step 1: Clone the Project
 -Create a folder and open it in VSCode.
 -Open the terminal and run:
	git clone https://github.com/Atika-Tabassum/Heathcare.git 
 -This will clone the project into your local directory.
 
Step 2: Backend Setup
 -Navigate to the backend directory.
 -Run the following commands to initialize the project and install dependencies:
  npm init -y
  npm install express
  npm install nodemon

 -Start the server by running:
  npm start
  -The server will run on port 3001.
  
Step 3: Database Setup
 -Download PostgreSQL and open the command line.
 -Change the PostgreSQL password to "carrot":
 -psql -U postgres
 -Give your current password
 -\password username( used postgres here)
 -Give the new password(carrot in this case)

 Or, simply in the backend/db.js change the user and password according to your own.
 Set the new password to "carrot".
 Alternatively, you can change the user and password in backend/db.js to match your PostgreSQL credentials.
 Create the database and tables using the SQL scripts in the backend/sqls directory.

Step 4: Frontend Setup
 -Navigate to the frontend directory.
 -Run the following command to install dependencies:
  npm install
 -Start the frontend by running:
  npm start
