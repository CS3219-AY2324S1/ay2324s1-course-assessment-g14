import express from "express";
import httpProxy from "http-proxy";
import cors from "cors";

const app = express();
const proxy = httpProxy.createProxyServer();
app.use(cors());

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


// Start the server
app.listen(3001, () => {
  console.log("API Gateway listening on port 3001");
});
