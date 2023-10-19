"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const question_controller_1 = require("./question/question.controller");
const app = (0, express_1.default)();
const port = 3002;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/questions", question_controller_1.handleGetQuestions);
app.post("/questions", question_controller_1.handleAddQuestion);
app.put("/questions/:questionId", question_controller_1.handleUpdateQuestion);
app.delete("/questions/:questionId", question_controller_1.handleDeleteQuestion);
app.listen(port, () => {
    console.log(`Question Service listening on port ${port}`);
});
