import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import AddQuestionForm, {QuestionData} from "./components/AddQuestionForm";

export default function App() {
    const handleQuestionSubmit = (questionData: QuestionData) => {
        // Handle the submitted question data, e.g., send it to an API or store it in state.
        console.log('Submitted Question Data:', questionData);
    };

    return (
    <>
      <Navbar />
      <Container>hello world!</Container>
        <Container>
            <AddQuestionForm onSubmit={handleQuestionSubmit} />
        </Container>
    </>
  );
}
