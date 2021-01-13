import React from "react";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

const Landing = () => {
  return (
    <div className="landing__container">
      <div className="landing">
        <h1>Class Companion</h1>
        <h2>Virtual Classroom Management... Simplified</h2>
        <div className="landing__callout">
          <div className="landing__callout-featured">
            <EmojiPeopleIcon className="landing__callout-featured-icon" />
            <h3>Take Attendance</h3>
            <h4>With dynamic daily check-ins</h4>
          </div>
          <div className="landing__callout-featured">
            <QuestionAnswerIcon className="landing__callout-featured-icon" />
            <h3>Take Questions</h3>
            <h4>And answer them in real-time</h4>
          </div>
          <div className="landing__callout-featured">
            <GroupWorkIcon className="landing__callout-featured-icon" />
            <h3>Take Control</h3>
            <h4>With flexible group creation</h4>
          </div>
        </div>
        <button>Let's Get Started!</button>
      </div>
    </div>
  );
};

export default Landing;
