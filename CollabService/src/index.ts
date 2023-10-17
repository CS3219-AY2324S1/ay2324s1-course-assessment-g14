import express, { Request, Response } from 'express';
import { createServer } from 'http';
import cors from 'cors';
// import { logger } from './logger';
import { WebSocketServer } from 'ws';
// import { setupWSConnection } from '../node_modules/y-websocket/bin/utils.js'

const setupWSConnection = require('y-websocket/bin/utils').setupWSConnection;

/**
 * CORSConfiguration
 */
export const allowedOrigins = ['*'];

/**
 * Server INITIALIZATION and CONFIGURATION
 * CORS configuration
 * Request body parsing
 */
const app = express();
app.use(cors(
  {
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type",
    credentials: true
  }
));
app.use(express.json());


/**
 * Create an http server
 */
export const httpServer = createServer(app);

/**
 * Create a wss (Web Socket Secure) server
 */
export const wss = new WebSocketServer({server: httpServer})

function onError(error: any) {
//   logger.info(error);
    console.log(error)
}

function onListening() {
//   logger.info("Listening")
    console.log('listening')

}

httpServer.on('error', onError);
httpServer.on('listening', onListening);

/**
* On connection, use the utility file provided by y-websocket
*/
wss.on('connection', (ws, req) => {
//   logger.info("wss:connection");
  setupWSConnection(ws, req);
  console.log("Collab Service Started")
})