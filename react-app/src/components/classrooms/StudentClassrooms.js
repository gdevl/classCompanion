import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardActions, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserClasses,
  fetchClassrooms,
  setCurrentClassRoom,
} from "../../store/users";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    backgroundColor: theme.palette.secondary.light,
    background: theme.palette.success.light,
    color: theme.palette.secondary.contrastText,
    height: "200px",
    minWidth: "300px",
    margin: "1em",
  },

  typography: {
    fontSize: theme.typography.fontSize,
  },

  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
    height: "70%",
    width: "100%",
  },

  outlined: {
    // outline: '1px solid blue',
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  addClassContainer: {
    display: "flex",
    justifyContent: "space-between",
  },

  modal: {
    position: "absolute",
    top: 300,
    left: 550,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  addClassSubmitButton: {
    marginTop: "10px",
  },

  addClassButton: {
    width: "10px",
  },
}));

const StudentClassrooms = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [classrooms, setClassrooms] = useState([]);
  const classroomData = useSelector((state) => state.store.classrooms);
  const currentUserId = useSelector((state) => state.store.current_user.id);

  let allClassrooms = [];
  let classIds = [];

  for (let classroomId in classroomData) {
    allClassrooms.push(classroomData[classroomId]);
    classIds.push(classroomId);
  }

  // useEffect(() => {
  //   const fetchClassData = async () => {
  //     const res = await fetch(`/api/users/${currentUserId}/classes`)
  //     const classroomData = await res.json()
  //     setClassrooms(classroomData)
  //     // classrooms.push(classroomData)
  //     // console.log(classroomData)
  //   }
  //   fetchClassData()

  // }, [])

  const handleViewClick = (classId) => {
    // alert(`re-routing to math class: ${classId}`)
    console.log(classroomData);
    console.log(classroomData[classId]);
    dispatch(setCurrentClassRoom(classroomData[classId]));
  };

  console.log(classrooms);
  return (
    <div className={classes.Container}>
      <Typography variant="h3" align="center">
        My Classes
      </Typography>
      <div className={classes.outlined}>
        {allClassrooms.map((classroom, idx) => {
          // console.log('CLASSROOM', classroom.classSize)
          return (
            <Card className={classes.paper} id={"HERE"} key={idx}>
              <CardContent className={classes.cardcontent}>
                <div className="classroom-data">
                  <div className="classroom-name">
                    <h2>
                      {/* {classroom.className}: {classroom.ClassTime} */}
                      {classroom.name}
                    </h2>
                  </div>
                  <div className="classroom-size">
                    <h3>
                      {/* Class Size: {classroom.ClassSize} */}
                      Class Size: {classroom.students.length}
                    </h3>
                  </div>
                </div>
              </CardContent>
              <CardActions className="classroom-buttons-container">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ color: "white" }}
                  size="small"
                  onClick={() => {
                    handleViewClick(classIds[idx]);
                  }}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StudentClassrooms;
