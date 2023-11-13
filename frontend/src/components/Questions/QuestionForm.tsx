import React, { useState } from "react";
import Question from "./Question";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Autocomplete, Typography } from "@mui/material";
import { QUESTION_CATEGORIES } from "./QuestionCategories";
import { Example } from "../../data/data.context";
import { useData } from "../../data/data.context";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

interface QuestionFormProps {
  question?: Question;
  onSubmit: (question: Question) => void;
  onCancel: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  question: initialQuestion,
  onSubmit,
  onCancel,
}) => {
  const [question, setQuestion] = useState(
    initialQuestion
      ? initialQuestion
      : new Question({
          difficulty: "Easy",
        })
  );
  const [constraints, setConstraints] = useState<string[]>(
    initialQuestion ? initialQuestion.constraints : []
  );
  const [examples, setExamples] = useState<Example[]>(
    initialQuestion ? initialQuestion.examples : []
  );

  const complexities = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];
  const { questions, getQuestions } = useData();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSimilarQuestionsDialog, setShowSimilarQuestionsDialog] =
    useState(false);
  const [similarQuestions, setSimilarQuestions] = useState<Question[]>([]);
  React.useEffect(() => {
    async function getInterviewQuestions() {
      getQuestions();
    }
    getInterviewQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTextInputChange = (e: { target: { id: any; value: any } }) => {
    let { id, value } = e.target;
    setQuestion((q) => ({
      ...q,
      [id]: value,
    }));
  };
  const openSnackbarWithMessage = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  // const handleSubmit = (e: { preventDefault: () => void; }) => {
  //     e.preventDefault();
  //     let questionToAdd = {...question};
  //     questionToAdd.constraints = constraints.filter((constraint) => constraint !== '');
  //     questionToAdd.examples = examples.filter((example) => example.text !== '' || example.image !== '');
  //     onSubmit(questionToAdd);
  // };

  const handleCancel = () => {
    onCancel();
  };

  const handleAddConstraint = () => {
    setConstraints([...constraints, ""]);
  };

  const handleRemoveConstraint = (index: number) => {
    setConstraints(constraints.filter((_, i) => i !== index));
  };

  const handleAddExample = () => {
    setExamples([...examples, { text: "", image: "" }]);
  };

  const handleRemoveExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index));
  };
  function calculateSimilarity(description1: string, description2: string) {
    const words1 = description1.split(" ");
    const words2 = description2.split(" ");

    const commonWords = words1.filter((word) => words2.includes(word));

    const similarity = commonWords.length / words1.length;

    return similarity;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check for empty fields
    if (!question.title || !question.description || !question.difficulty) {
      openSnackbarWithMessage(
        "Please fill out all required fields (Title, Description, and Difficulty), and select at least ONE category"
      );
      return;
    }

    // Check for at least one category selected
    if (question.categories.length === 0) {
      openSnackbarWithMessage("Please select at least one category.");
      return;
    }

    // Check for similar questions
    const similarityThreshold = 0.6; // Adjust as needed
    const similarQuestions = questions.filter((existingQuestion) => {
      const similarity = calculateSimilarity(
        existingQuestion.description,
        question.description
      );
      return similarity >= similarityThreshold;
    });

    if (similarQuestions.length > 0) {
      setSimilarQuestions(similarQuestions);
      setShowSimilarQuestionsDialog(true);
    } else {
      // No similar questions found, proceed with submission
      onSubmit(question);
    }
  };

  const handleCloseDialog = () => {
    setShowSimilarQuestionsDialog(false);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          style={{ width: "50%" }} // Adjust the width as needed
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <form>
        <Grid container spacing={3} justifyContent="center">
          <Grid item sm={6}>
            <TextField
              required
              id="title"
              label="Question Title"
              fullWidth
              value={question.title}
              onChange={handleTextInputChange}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              required
              id="difficulty"
              select
              label="Difficulty"
              fullWidth
              value={question.difficulty}
              onChange={(e) =>
                setQuestion({ ...question, difficulty: e.target.value })
              }
            >
              {complexities.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="categories-outlined"
              options={QUESTION_CATEGORIES}
              limitTags={5}
              filterSelectedOptions
              value={question.categories}
              onChange={(event: any, updatedCategories: string[]) => {
                setQuestion({ ...question, categories: updatedCategories });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Categories" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              label="Description"
              fullWidth
              multiline
              minRows={10}
              maxRows={30}
              value={question.description}
              onChange={handleTextInputChange}
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction={"row"}
            spacing={3}
            alignItems={"center"}
          >
            <Grid item>
              <Typography variant="h6">
                Constraints: {constraints.length}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleAddConstraint}>
                +
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            {constraints.map((constraint, index) => (
              <Grid
                container
                item
                xs={12}
                direction={"row"}
                spacing={3}
                alignItems={"center"}
                key={index}
              >
                <Grid item xs={10}>
                  <TextField
                    id={"constraint" + (index + 1)}
                    label={"Constraint " + (index + 1)}
                    fullWidth
                    value={constraint}
                    onChange={(e) => {
                      let updatedConstraints = [...constraints];
                      updatedConstraints[index] = e.target.value;
                      setConstraints(updatedConstraints);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveConstraint(index)}
                  >
                    -
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction={"row"}
            spacing={3}
            alignItems={"center"}
          >
            <Grid item>
              <Typography variant="h6">Examples: {examples.length}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleAddExample}>
                +
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            {examples.map((example, index) => (
              <Grid
                container
                item
                xs={12}
                direction={"row"}
                spacing={3}
                alignItems={"center"}
                key={index}
              >
                <Grid container item xs={10} spacing={1} alignItems={"center"}>
                  <Grid item xs={12}>
                    <TextField
                      id={"example" + (index + 1) + "text"}
                      label={"Example " + (index + 1) + " Text"}
                      fullWidth
                      value={example.text}
                      onChange={(e) => {
                        let updatedExamples = [...examples];
                        updatedExamples[index].text = e.target.value;
                        setExamples(updatedExamples);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={"example" + (index + 1) + "image"}
                      label={"Example " + (index + 1) + " Image"}
                      fullWidth
                      value={example.image}
                      onChange={(e) => {
                        let updatedExamples = [...examples];
                        updatedExamples[index].image = e.target.value;
                        setExamples(updatedExamples);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveExample(index)}
                  >
                    -
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Dialog open={showSimilarQuestionsDialog} onClose={handleCloseDialog}>
        <DialogTitle>Similar Questions Found</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Similar questions already exist. Please review them before
            proceeding.
          </Typography>
          {similarQuestions.map((similarQuestion) => (
            <div key={similarQuestion.id}>
              <Typography variant="h6">{similarQuestion.title}</Typography>
              <Typography variant="body2">
                {similarQuestion.description}
              </Typography>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => onSubmit(question)}>
            Submit Anyway
          </Button>
          <Button variant="outlined" onClick={handleCloseDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default QuestionForm;
