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
exports.handleAddQuestion = exports.handleDeleteQuestion = exports.handleGetQuestions = void 0;
const question_service_1 = require("./question.service");
const firestore_1 = require("firebase/firestore");
function handleGetQuestions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //   console.log(req.query.email);
            //   const { email } = req.query;
            const query = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(question_service_1.db, "questions"));
            const result = yield Promise.all(query.docs.map((d) => __awaiter(this, void 0, void 0, function* () {
                const q = d.data();
                const examplesArray = yield getExamples(d.id);
                return {
                    id: d.id,
                    title: q.title,
                    tags: q.tags,
                    categories: q.categories,
                    constraints: q.constraints,
                    difficulty: q.difficulty,
                    description: q.description,
                    examples: examplesArray,
                };
            })));
            if (result.length > 0) {
                res.status(200).send(result);
            }
            else {
                res.status(500).send("no questions");
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });
}
exports.handleGetQuestions = handleGetQuestions;
const getExamples = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const subCollRef = (0, firestore_1.collection)(question_service_1.db, "questions", id, "examples");
    const examplesSnapshot = yield (0, firestore_1.getDocs)(subCollRef);
    const examplesResult = examplesSnapshot.docs.map((data) => {
        const exampleData = data.data();
        return {
            text: exampleData.text,
            image: exampleData.img || "", // Use an empty string if image is missing
        };
    });
    // console.log(examplesSnapshot)
    return examplesResult;
});
function handleDeleteQuestion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const questionId = req.params.questionId;
        try {
            const docRef = (0, firestore_1.doc)(question_service_1.db, "questions", questionId);
            const result = yield (0, firestore_1.deleteDoc)(docRef);
        }
        catch (err) {
            console.log(`error when deleting question with id ${questionId}` + err);
            res.status(500).send(err);
        }
    });
}
exports.handleDeleteQuestion = handleDeleteQuestion;
function handleAddQuestion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, tags, categories, constraints, difficulty, description, examples, } = req.body;
            console.log(`adding question ${title}`);
            const question = yield (0, question_service_1.addQuestion)({
                title: title,
                tags: tags,
                categories: categories,
                constraints: constraints,
                difficulty: difficulty,
                description: description,
                examples: examples,
            });
            res.status(200).send(question);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.handleAddQuestion = handleAddQuestion;
