# Assignment 3

### Features:

- User authentication for accessing questions: frontend and backend.
- Session management on page refresh, on close browser.
- Authorization management using 3 roles: master, admin and user.
- Master role can create and remove admins.
- Admin role can CRUD questions.
- User role can read questions.

### Requirements:

- Docker (Optional for assignment submission purposes: assuming docker not implemented since it is in assignment 4, docker only for Quality of Life purposes, all features of assignment 3 still functional)

### Test accounts:

1. user (can create on the sign up page)
   - email: `test@mail.com`
   - password: `password1`
2. admin (can create using the master account)
   - email: `admin@mail.com`
   - password: `password1`
3. master (cannot be created, only one available)
   - email: `master@gmail.com`
   - password: `master123`

### Startup using Docker (optional, for quality of life only):

1. Run Docker Daemon
2. Open new terminal
3. run `docker-compose up --build`
4. Wait for docker to build
5. Access frontend on [http://localhost:3000/](http://localhost:3000/)

### Startup without Docker:

1. Open new terminal
2. run `cd QuestionService`
3. run `npm install`
4. run `npm run dev`
5. Open new terminal
6. run `cd AuthService`
7. run `npm install`
8. run `npm run dev`
9. Open new terminal
10. run `cd UserService`
11. run `npm install`
12. run `npm run dev`
13. Open new terminal
14. run `cd ApiGatewayService`
15. run `npm install`
16. run `npm run dev`
17. Open new terminal
18. run `cd frontend`
19. run `npm install`
20. run `npm start`
21. Access frontend on [http://localhost:3000/](http://localhost:3000/)
