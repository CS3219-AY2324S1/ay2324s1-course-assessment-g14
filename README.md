# Assignment 4
Requirements:
- Docker

Steps:
1. Open up your Terminal or command line
2. Navigate to the project's base directory, where the docker-compose.yml is
3. Run `docker-compose up --build`
4. Wait for the containers to finish building and run
5. Open up your Docker dashboard, the new images and containers should be visible:
   1. frontend
   2. api-gateway
   3. question-service
   4. user-service
   5. auth-service
6. Open your browser and go to the address `http://localhost:3000/`
7. Login into the website using our admin account
8. Feel free to test our Questions and User service features. For example:
   1. Managing Questions
      1. Click on the 'Manage Questions' button in the NavBar above
      2. Click on 'Add Question' button
      3. Type in a dummy question and click 'Submit'
      4. Go back to the home page to and check that the new question is in the question table
      5. Check the Terminal/command line/Logs in the question-service container in Docker dashboard to view the message logs
   2. Managing User Profile
      1. Click on the top right profile button
      2. Select 'Profile'
      3. Click on 'Edit Profile' button
      4. Change any profile details, then click on 'Save'
      5. Check the Terminal/command line/Logs in the user-service container in Docker dashboard to view the message logs