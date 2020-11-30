import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ClassroomLayout from "./ClassroomLayout";
import "./ClassroomLayout.css";

// grab classroom user data as well as group data here and pass it down the chain
const users = [
  {
    id: 1,
    // username: 'Warren',
    first_name: "Warren",
    last_name: "Tamagri",
    email: "warren@tamagri.com",
    avatar_url:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjooinn.com%2Fimages%2Fdog-67.jpg&f=1&nofb=1",
    role: "Instructor",
    checked_in: true,
    // active_question: true,
    // question: 'Why doesn\'t it default to having a created and updated at column?'
  },
  {
    id: 2,
    username: "Gabe",
    first_name: "Gabriel",
    last_name: "Lane",
    email: "gabe@lane.com",
    avatar_url: null,
    role: "Student",
    checked_in: false,
    active_question: true,
    question: "Why am I the student?",
  },
  {
    id: 3,
    username: null,
    first_name: "Ryan",
    last_name: "Matuszak",
    email: "ryan@matuszak.com",
    avatar_url:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.purrform.co.uk%2Fwp-content%2Fuploads%2F2016%2F09%2Fcat-tonges.jpg&f=1&nofb=1",
    role: "Student",
    checked_in: true,
    active_question: false,
    question: null,
  },
  {
    id: 4,
    username: "Randy",
    first_name: "Ranson",
    last_name: "Knorr",
    email: "ranson@knorr.com",
    avatar_url: null,
    role: "Student",
    checked_in: false,
    active_question: true,
    question: "Why does my head hurt?",
  },
  {
    id: 5,
    username: "Bart",
    first_name: "Bart",
    last_name: "Dorsey",
    email: "bart@dorsey.com",
    avatar_url:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsomeinterestingfacts.net%2Fwp-content%2Fuploads%2F2012%2F12%2Fhappy-dog.jpg&f=1&nofb=1",
    role: "Student",
    checked_in: false,
    active_question: false,
    question: "Why does my head hurt?",
  },
  {
    id: 6,
    username: null,
    first_name: "Surgey",
    last_name: "Girdin",
    email: "surgey@girdin.com",
    avatar_url: null,
    role: "Student",
    checked_in: true,
    active_question: false,
    question: "Why does my head hurt?",
  },
  {
    id: 7,
    username: "J Balla",
    first_name: "James",
    last_name: "Ballard",
    email: "james@ballard.com",
    avatar_url:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.mercola.com%2FImageServer%2FPublic%2F2018%2FOctober%2FFB%2Fdog-breeds-for-active-people-fb.jpg&f=1&nofb=1",
    role: "Student",
    checked_in: true,
    active_question: true,
    question: "Why is python so cool?",
  },
];
const groups = {
  grouped: false,
  groupSize: 3,
};
export default function ClassroomLayoutContainer({ props }) {
  return (
    <Grid container justify="center" spacing={3}>
      <ClassroomLayout props={props} />
    </Grid>
  );
}
