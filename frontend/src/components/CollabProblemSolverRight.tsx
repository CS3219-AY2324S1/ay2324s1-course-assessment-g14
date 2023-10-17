import React, { useState, useEffect, useRef } from "react";
import { Paper, Typography, TextField, MenuItem, Button } from "@mui/material";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

import { MonacoBinding } from "y-monaco";
import { editor } from "monaco-editor";

const languages: string[] = ["C++", "Java", "JavaScript", "Python"];

function CollabProblemSolverRight({
  user1,
  user2,
}: {
  user1: string;
  user2: string;
}) {
  const userId1 = user1;
  const userId2 = user2;

  const serverWsUrl = `${process.env.REACT_APP_COLLAB_BASE_URL}`;
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
//   const chatWebSocket = new WebSocket(`${process.env.REACT_APP_CHAT_BASE_URL}`);
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("JavaScript");
  const [code, setCode] = useState<string>('class Solution:');

  // State variable for chat messages
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [chatWebSocket, setChatWebSocket] = useState<WebSocket | null>(null);
  const [webSocketState, setWebSocketState] = useState<string>('disconnected'); // Add a state variable to track WebSocket state


  useEffect(() => {
    // Initialize yjs
    const doc = new Y.Doc();

    // Connect to WebSocket server
    const provider: WebsocketProvider = new WebsocketProvider(
      serverWsUrl,
      user1 + "&" + user2,
      doc
    );
    const type = doc.getText("monaco");

    // Bind yjs doc to Monaco editor
    if (editorRef.current) {
      const binding = new MonacoBinding(
        type,
        editorRef.current.getModel()!,
        new Set([editorRef.current])
      );
    }
    const chatSocket = new WebSocket(`${process.env.REACT_APP_CHAT_BASE_URL}`);

    chatSocket.onopen = (event) => {
      console.log('Chat WebSocket opened');
      setWebSocketState('connected'); // Update WebSocket state when connected
    };
  
    chatSocket.onmessage = (event) => {
      const receivedMessage = event.data.toString();
      // Process and display the received message
      setChatMessages([...chatMessages, receivedMessage]);
    };
  
    chatSocket.onclose = (event) => {
      console.log('Chat WebSocket closed', event);
      setWebSocketState('disconnected'); // Update WebSocket state when disconnected
    };
  
    chatSocket.onerror = (event) => {
      console.error('Chat WebSocket error', event);
      setWebSocketState('disconnected'); // Update WebSocket state when an error occurs
    };
  
    setChatWebSocket(chatSocket); // Store the WebSocket instance in state
  }, []);

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedLanguage(event.target.value as string);
  };

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleNewMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleNewMessageKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendChatMessage();
    }
  };

  const handleSendChatMessage = () => {
    if (newMessage && chatWebSocket && webSocketState === 'connected') {
        // Send the message to the WebSocket server
        // TODO: CHECK WHO IS SENDING MSG
        chatWebSocket.send(`${userId1}: ${newMessage}`);
      
        // Add the new message to chatMessages
        setChatMessages([...chatMessages, `${userId1}: ${newMessage}`]);
      
        // Clear the input field
        setNewMessage('');
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
        {chatMessages.map((message, index) => (
          <div key={index}>{message}</div>
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
