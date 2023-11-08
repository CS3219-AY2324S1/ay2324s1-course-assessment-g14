import * as React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import socket from "./socket";
import { useAuth } from "../../auth/auth.context";
import { sha256 } from "js-sha256";
import Question from "../Questions/Question";
import { useData } from "../../data/data.context";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  display: "flex-wrap",
  // Remove or adjust the maxHeight value
  //maxHeight: "60%",
  justifyContent: "center",
  textAlign: "center",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const snackbarStyle = {
  position: "absolute" as "absolute",
  top: 3,
  left: "50%",
  transform: "translate(-50%, 0)",
};

const titleStyle = {
  fontSize: "2rem", // Increase the title size
};

const subtitleStyle = {
  fontSize: "1.5rem",
  padding: "10px",

  // Increase the subtitle size
};

const dropdownStyle = {
  fontSize: "1.5rem", // Increase the font size
  padding: "10px", // Add padding for a bigger and more clickable area
  margin: "10px 0", // Space out the dropdowns a bit more
};

const MatchingForm = React.forwardRef(function MatchingForm() {
  const { questions, getQuestions } = useData();
  const [difficulty, setDifficulty] = React.useState("Easy");
  const [category, setCategory] = React.useState("Strings");
  const [categoryList, setCategoryList] = React.useState<string[]>([]);
  const [isMatching, setIsMatching] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const userEmail = user?.email;
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  React.useEffect(() => {
    getQuestions();
    // eslint-disable-next-line
  }, []);

  const handleConnect = async () => {
    const preferences = {
      userEmail,
      difficulty,
      category,
    };
    // if no such question with difficulty and category, show a pop up saying no question
    // matching the requirements

    const filteredQuestions = questions.filter((q: any) => {
      return q.categories.includes(category) && q.difficulty === difficulty;
    });

    if (filteredQuestions.length === 0) {
      setSnackbarMessage(
        "No questions match the selected difficulty and category."
      );
      setOpenSnackbar(true);
      return;
    }

    socket.emit("startMatching", preferences);
    setIsMatching(true);
  };

  const generateConsistentRandomIndex = (seed: any, arrayLength: number) => {
    return seed % arrayLength;
  };

  const getRandomQuestion = async (seed: any) => {
    const filteredQuestions = questions.filter((q: any) => {
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
      // const questionsData = (await getAllQuestions()) as { data: Question[] };
      const allCategories = questions.reduce(
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
      const qId = await getRandomQuestion(seed);
      const emails = [userEmail, matchedUser.userEmail].sort();

      // Hash the sorted emails
      const hashedEmailOne = sha256(emails[0]);
      const hashedEmailTwo = sha256(emails[1]);
      navigate(`/collab/question/${qId}/${hashedEmailOne}/${hashedEmailTwo}`);
    });

    return () => {
      socket.off("matchFound");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, category, userEmail, navigate]);

  React.useEffect(() => {
    socket.on("noMatchFound", () => {
      console.log("Match Not Found");
      setIsMatching(false);
      setSnackbarMessage("No eligible match found within the given timeframe.");
      setOpenSnackbar(true);
    });

    return () => {
      socket.off("noMatchFound");
    };
  });

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
        <label htmlFor="difficulty" style={subtitleStyle}>
          Difficulty:
        </label>
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
        <label htmlFor="category" style={subtitleStyle}>
          Category:
        </label>
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
        style={snackbarStyle}
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
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default MatchingForm;
