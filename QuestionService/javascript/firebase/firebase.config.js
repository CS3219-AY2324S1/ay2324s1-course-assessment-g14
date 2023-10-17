"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = void 0;
require("dotenv/config");
exports.firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "peerprep-d7af2.firebaseapp.com",
    projectId: "peerprep-d7af2",
    storageBucket: "peerprep-d7af2.appspot.com",
    messagingSenderId: "852795173750",
    appId: "1:852795173750:web:b1aed6d65dc6d4cb566857",
    measurementId: "G-NZSVYREFLC",
};
