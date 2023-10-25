import express from "express";
import httpProxy from "http-proxy";
import cors from "cors";
// import http from 'http';
// import { Server } from 'socket.io';

const app = express();
const proxy = httpProxy.createProxyServer();
app.use(cors());

// // Create an HTTP server and attach Socket.IO to it
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//       origin: '*',
//     },
//     path: 'ws'
//   });

// Define routes for each backend service for local development
// app.use('/questionservice', (req, res) => {
//     proxy.web(req, res, { target: 'http://localhost:3002' });
// });

// app.use('/authservice', (req, res) => {
//     proxy.web(req, res, { target: 'http://localhost:3003' });
// });

// app.use('/userservice', (req, res) => {
//     proxy.web(req, res, { target: 'http://localhost:3004' });
// });

// app.use('/matchingservice', (req, res) => {
//     proxy.web(req, res, { target: 'http://localhost:3005' });
// });

//Define routes for each backend service for production/docker containers
// app.use("/questionservice", (req, res) => {
//   proxy.web(req, res, { target: "http://localhost:3002" });
//   //http://question-service:3002
//   //http://localhost:3002
// });
//
// app.use("/authservice", (req, res) => {
//   proxy.web(req, res, { target: "http://localhost:3003" });
//   //http://auth-service:3003
//   //http://localhost:3003
// });
//
// app.use("/userservice", (req, res) => {
//   proxy.web(req, res, { target: "http://localhost:3004" });
//   // http://user-service:3004
//   //http://localhost:3004
// });
//
// app.use("/matchingservice", (req, res) => {
//   proxy.web(req, res, { target: "http://localhost:3005" });
//   //http://matching-service:3005
//   //http://localhost:3005
// });

// Define routes for each backend service for production/docker containers
app.use("/questionservice", (req, res) => {
  proxy.web(req, res, { target: "http://question-service:3002" });
});

app.use("/authservice", (req, res) => {
  proxy.web(req, res, { target: "http://auth-service:3003" });
});

app.use("/userservice", (req, res) => {
  proxy.web(req, res, { target: "http://user-service:3004" });
});

app.use("/matchingservice", (req, res) => {
  proxy.web(req, res, { target: "http://matching-service:3005" });
});


// Start the server
app.listen(3001, () => {
  console.log("API Gateway listening on port 3001");
});
