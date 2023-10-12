"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebase_config_1 = require("../firebase/firebase.config");
(0, app_1.initializeApp)(firebase_config_1.firebaseConfig);
exports.db = (0, firestore_1.getFirestore)();
