import React, { useState, useEffect, useRef } from "react";
import { Paper, Typography, TextField, MenuItem, Button } from "@mui/material";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useAuth } from "../auth/auth.context";
import { Socket, io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { MonacoBinding } from "y-monaco";
import { editor } from "monaco-editor";
import { DefaultEventsMap } from "@socket.io/component-emitter";

interface ChatMessage {
  id: string;
  content: string;
}
const languages: string[] = ["C++", "Java", "JavaScript", "Python"];

function CollabProblemSolverRight({
  user1,
  user2,
}: {
  user1: string;
  user2: string;
}) {
  const { user } = useAuth();
  const roomId = user1 + "&" + user2; // Create a room ID based on user1 and user2
  const serverWsUrl = process.env.REACT_APP_COLLAB_BASE_URL;
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("JavaScript");
  const [code, setCode] = useState<string>("class Solution:");

  // State variable for chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    try {
      editorRef.current = editor;
      const doc = new Y.Doc();
      const provider: WebsocketProvider = new WebsocketProvider(
        serverWsUrl!,
        user1 + "&" + user2,
        doc
      );
      const type = doc.getText("monaco");
      const binding = new MonacoBinding(
        type,
        editorRef.current.getModel()!,
        new Set([editorRef.current])
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    try {
      socketRef.current = io(`${process.env.REACT_APP_CHAT_BASE_URL}`);

      socketRef.current.emit("joinRoom", roomId);

      socketRef.current.on("receiveMessage", (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socketRef.current?.disconnect();
      };
    } catch (err) {
      console.log(err);
    }
  }, [roomId]);

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedLanguage(event.target.value as string);
  };

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleNewMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMessage(event.target.value);
  };

  const handleNewMessageKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSendChatMessage();
    }
  };

  const handleSendChatMessage = () => {
    try {
      if (newMessage && user) {
        const messageToSend = {
          id: uuidv4(),
          content: `${user.name}: ${newMessage}`,
        };
        socketRef.current?.emit("sendMessage", roomId, messageToSend);
        setChatMessages([...chatMessages, messageToSend]);
        setNewMessage("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Paper
      elevation={3}
      style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h6" gutterBottom>
        Select a Language:
      </Typography>
      <TextField
        select
        fullWidth
        value={selectedLanguage}
        onChange={handleLanguageChange}
        style={{ width: "50%" }}
      >
        {languages.map((language, index) => (
          <MenuItem key={index} value={language}>
            {language}
          </MenuItem>
        ))}
      </TextField>
      <Typography variant="h6" gutterBottom style={{ marginTop: "16px" }}>
        Code Editor:
      </Typography>
      <Editor
        onMount={handleEditorDidMount}
        height="800px"
        language={selectedLanguage.toLowerCase()}
        theme="vs-dark"
        value={code}
        onChange={handleCodeChange} // Update the code when changed
      />
      <Typography variant="h6" gutterBottom style={{ marginTop: "16px" }}>
        Chat:
      </Typography>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "16px",
          maxHeight: "150px",
          padding: "8px", // Add padding inside the chat box
          backgroundColor: "#DCDCDC", // Change the chat box background color
          borderRadius: 8, // Add border radius to chat box
        }}
      >
        {chatMessages.map((message) => (
          <div key={message.id}>{message.content}</div>
        ))}
      </div>
      <TextField
        fullWidth
        label="message"
        variant="outlined"
        value={newMessage}
        onChange={handleNewMessageChange}
        onKeyPress={handleNewMessageKeyPress}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSendChatMessage}
        style={{ marginTop: "16px" }}
      >
        Send
      </Button>
    </Paper>
  );
}

export default CollabProblemSolverRight;
