import React from "react";
import AskQuestion from "./AskQuestion";

export default function AskQuestionContainer({ props, socket }) {
  return <AskQuestion props={props} socket={socket} />;
}
