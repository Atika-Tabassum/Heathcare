To run this project, follow the steps :

1.
 Make a folder and open it in VScode. Open the terminal and clone the project from the github. For this, type - git clone https://github.com/Atika-Tabassum/Heathcare.git 
and press enter. Thus a clone will be created in your local directory.

2.
 Go to the directory of backend and run the following command.
npm init -y
npm install express
npm install nodemon

Now, the installation is done. Give the command “npm start” and the server will run on port 3001.

3.
For database, download postgres. Open command line and change the password as “carrot”
For this, in the command prompt, type:
Psql -U postgres
Give your current password
\password username( used postgres here)
Give the new password(carrot in this case)

Or, simply in the backend/db.js change the user and password according to your own.

4.
Now from the command line, create database. Then the tables. You will get all the sqls in backend/sqls.

5.
Go to frontend. And run “npm install” in the terminal. To run the frontend, type “npm start”
