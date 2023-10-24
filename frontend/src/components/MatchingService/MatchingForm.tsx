import * as React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import socket from "./socket";
import { getAllQuestions } from "../../api/questions/data";
import { useAuth } from "../../auth/auth.context";
import { sha256 } from "js-sha256";
import Question from "../Questions/Question";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  display: "flex-wrap",
  maxHeight: "60%",
  justifyContent: "center",
  textAlign: "center",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "auto",
  p: 4,
};



const titleStyle = {
    fontSize: "2rem"    // Increase the title size
  };
  
  const subtitleStyle = {
    fontSize: "1.5rem",
    padding:'10px',
    
    // Increase the subtitle size
  };

  
const dropdownStyle = {
    fontSize: "1.5rem", // Increase the font size
    padding: "10px",    // Add padding for a bigger and more clickable area
    margin: "10px 0"    // Space out the dropdowns a bit more
  };
  

const MatchingForm = React.forwardRef(function MatchingForm() {
  const [difficulty, setDifficulty] = React.useState("Easy");
  const [category, setCategory] = React.useState("Strings");
  const [categoryList, setCategoryList] = React.useState<string[]>([]);
  const [isMatching, setIsMatching] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const userEmail = user?.email;
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleConnect = async () => {
    const preferences = {
      userEmail,
      difficulty,
      category,
    };
    // if no such question with difficulty and category, show a pop up saying no question
    // matching the requirements

    const questions = await getAllQuestions();
    const filteredQuestions = questions.data.filter((q: any) => {
      return q.categories.includes(category) && q.difficulty === difficulty;
    });

    if (filteredQuestions.length === 0) {
      setOpenSnackbar(true);
      return;
    }

    socket.emit("startMatching", preferences);
    setIsMatching(true);
  };

  const generateConsistentRandomIndex = (seed: any, arrayLength: number) => {
    return seed % arrayLength;
  };

  const getQuestions = async (seed: any) => {
    const questions = await getAllQuestions();
    const filteredQuestions = questions.data.filter((q: any) => {
      return q.categories.includes(category) && q.difficulty === difficulty;
    });

    const randomIndex = generateConsistentRandomIndex(
      seed,
      filteredQuestions.length
    );
    const selectedQuestion = filteredQuestions[randomIndex];
    if (!selectedQuestion) {
      return 1;
    }
    const selectedId = selectedQuestion.id;
    return selectedId;
  };

  React.useEffect(() => {
    async function getCategories() {
      const questionsData = (await getAllQuestions()) as { data: Question[] };
      const allCategories = questionsData.data.reduce(
        (acc: string[], question: Question) => {
          return [...acc, ...question.categories];
        },
        []
      );
      const uniqueCategories = Array.from(new Set(allCategories));
      setCategoryList(uniqueCategories);
    }
    getCategories();
  }, []);

  React.useEffect(() => {
    socket.on("matchFound", async (matchedUserPreferences) => {
      console.log("Match Found:", matchedUserPreferences);
      const seed = matchedUserPreferences.seed;
      const matchedUser = matchedUserPreferences.matchedUserPreferences;
      setIsMatching(false);
      const qId = await getQuestions(seed);
      const emails = [userEmail, matchedUser.userEmail].sort();

      // Hash the sorted emails
      const hashedEmailOne = sha256(emails[0]);
      const hashedEmailTwo = sha256(emails[1]);
      navigate(`/collab/question/${qId}/${hashedEmailOne}/${hashedEmailTwo}`);
    });

    return () => {
      socket.off("matchFound");
    };
  }, [difficulty, category, userEmail, navigate]);

  return (
    <Box sx={style}>
      <h2 style={titleStyle}>
        <center>Please select a difficulty and question category.</center>
      </h2>
      <h4 style={subtitleStyle}>
        <center>
          We will attempt to connect you with a user who chose the same options
          as you within 30 seconds.
        </center>
      </h4>
      <div>
        <label htmlFor="difficulty" style={subtitleStyle}>Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={dropdownStyle}
        >
          <option value="">None</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div>
        <label htmlFor="category" style={subtitleStyle}>Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={dropdownStyle}
        >
          <option value="">None</option>
          {categoryList.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {isMatching ? (
        <div>Loading...</div>
      ) : (
        <Button sx={{ mt: "5%" }} variant="contained" onClick={handleConnect}>
          Connect
        </Button>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          No questions match the selected difficulty and category.
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default MatchingForm;
