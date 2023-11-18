import { ReactNode } from "react";
import { Container } from "@mui/material";

interface CenteredContainerProps {
  children: ReactNode;
}

export default function CenteredContainer({
  children,
}: CenteredContainerProps) {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90%",
        flexDirection: "column",
      }}
    >
      {children}
    </Container>
  );
}
