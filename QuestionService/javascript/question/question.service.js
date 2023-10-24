"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQuestion = exports.updateQuestion = exports.deleteQuestion = exports.db = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebase_config_1 = require("../firebase/firebase.config");
(0, app_1.initializeApp)(firebase_config_1.firebaseConfig);
exports.db = (0, firestore_1.getFirestore)();
function deleteQuestion(questionId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docRef = (0, firestore_1.doc)(exports.db, "questions", questionId);
            yield (0, firestore_1.deleteDoc)(docRef);
            return Promise.resolve();
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
}
exports.deleteQuestion = deleteQuestion;
function updateQuestion(questionId, question) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let questionDoc = question;
            const docRef = (0, firestore_1.doc)(exports.db, "questions", questionId);
            yield (0, firestore_1.setDoc)(docRef, questionDoc);
            for (let i = 0; i < question.examples.length; i++) {
                const add = (0, firestore_1.setDoc)((0, firestore_1.doc)(docRef, "examples", (i + 1).toString()), question.examples[i]);
            }
            return Promise.resolve(question);
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
}
exports.updateQuestion = updateQuestion;
function addQuestion(question) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let questionDoc = question;
            const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(exports.db, "questions"), questionDoc);
            for (let i = 0; i < question.examples.length; i++) {
                const add = (0, firestore_1.setDoc)((0, firestore_1.doc)(docRef, "examples", (i + 1).toString()), question.examples[i]);
            }
            return Promise.resolve(question);
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
}
exports.addQuestion = addQuestion;
