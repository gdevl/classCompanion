import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActions,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BsFillPauseFill, BsFillPlusSquareFill } from "react-icons/bs";
import { BsPlusSquare } from "react-icons/bs";
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserClasses,
  fetchClassrooms,
  setCurrentClassRoom,
} from "../../store/users";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
    color: theme.palette.primary.contrastText,
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

  classModal: {
    // position: 'absolute',
    position: "relative",
    top: "20rem",
    // top: 300,
    // left: 550,
    // left: 850,
    left: "20rem",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    paddingLeft: "5rem",
    paddingRight: "5rem",
    paddingTop: "2rem",
    paddingBottom: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid white",
  },

  addClassSubmitButton: {
    marginTop: "2rem",
  },

  addClassButton: {
    width: "10px",
  },

  enrollStudentsTransferList: {
    width: 200,
    height: 230,
    overflow: "auto",
  },

  enrollStudentsModal: {
    top: "5rem",
    left: "30rem",
    width: 700,
    height: 500,
    position: "relative",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: "whitesmoke",
  },

  enrollStudentsModalSmall: {
    width: 600,
    height: 400,
    position: "relative",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: "whitesmoke",
  },

  transferListGridContainer: {
    margin: "auto",
    backgroundColor: "white",
    // position: 'absolute',
    // top: 200,
    // left: 200
  },

  addClass: {
    padding: theme.spacing(2),
    textAlign: "left",
    // backgroundColor: theme.palette.secondary.light,
    // background: theme.palette.success.light,
    color: "black",
    height: "200px",
    minWidth: "300px",
    margin: "1em",
    textAlign: "center",
    border: "1px solid black",
    "&:hover": {
      border: "2.5px solid black",
    },
  },

  Title: {
    width: "100%",
    textAlign: "center",
    position: "relative",
    top: "-5rem",
  },

  Container: {
    display: "flex",
    flexDirection: "column",
  },
}));

const InstructorClassrooms = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classTime, setClassTime] = useState("");
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [enrolledStudentIds, setEnrolledStudentIds] = useState([]);
  const [classToDelete, setClassToDelete] = useState(null);
  const [currentClass, setCurrentClass] = useState("");
  const classroomData = useSelector((state) => state.store.classrooms);
  const currentUserId = useSelector((state) => state.store.current_user.id);
  const matches = useMediaQuery("(min-width:600px)");

  let allClassrooms = [];
  let classIds = [];
  let test = [];
  let ids = [];
  let id = [];
  for (let classroomId in classroomData) {
    allClassrooms.push(classroomData[classroomId]);
    classIds.push(classroomId);
  }

  // CREATE A CLASS ------------------------------------------------------------------------------------------------------------------------

  const handleAddClass = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    if (e.target.id === "name-input") {
      setClassName(e.target.value);
    } else if (e.target.id === "description-input") {
      setClassDescription(e.target.value);
    } else {
      setClassTime(e.target.value);
    }
  };

  const submitClass = async () => {
    const body = {
      className,
      classDescription,
      classTime,
    };

    const res = await fetch(`/api/users/${currentUserId}/classes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await res.json();

    const updatedClasses = await fetchClassrooms(currentUserId);
    dispatch(setUserClasses(updatedClasses));
  };

  const handleCreateClass = (e) => {
    e.preventDefault();
    setModalOpen(false);
    submitClass();
  };

  const addClassBody = (
    <div className={classes.classModal}>
      <h2 id="simple-modal-title">Class Info:</h2>
      <div>
        <FormControl>
          <InputLabel htmlFor="name-input">Name</InputLabel>
          <Input id="name-input" onChange={handleInputChange} autoFocus />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="description-input">Description</InputLabel>
          <Input id="description-input" onChange={handleInputChange} />
        </FormControl>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          size="small"
          className={classes.addClassSubmitButton}
          onClick={handleCreateClass}
          type="submit"
        >
          Create Class
        </Button>
      </div>
    </div>
  );

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // DELETE A CLASS --------------------------------------------------------------------------------------------------------------------------------------------

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeactivateConfirmation = (classId) => {
    setClassToDelete(classId);
    setDialogOpen(true);
  };

  const handleClassDelete = async () => {
    setDialogOpen(false);
    const res = await fetch(`api/classes/${classToDelete}/delete`, {
      method: "PATCH",
    });
    const response = await res.json();
    const updatedClasses = await fetchClassrooms(currentUserId);
    // console.log(updatedClasses)
    dispatch(setUserClasses(updatedClasses));
    // alert('Deleted Class')
  };

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------

  // VIEW A CLASS-------------------------------------------------------------------------------------------------------------------------------|

  const handleViewClick = async (classId) => {
    // alert(`re-routing to math class: ${classId}`)
    dispatch(setCurrentClassRoom(classroomData[classId]));
  };

  // -----------------------------------------------------------------------------------------------------------------------------------------------|

  // START T-LIST SECTION

  // (OTHER UI IS IN THE MAIN RETURN STATMENT FOR THE INSTRUCTOR CLASSROOMS COMPONENT)---------------------------------------------------------------------------------------------------------------------------------

  // T-LIST BOILERPLATE-------------------------------------------------------------------------------------------------------------------
  const customList = (items) => (
    <Paper className={classes.enrollStudentsTransferList}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.id}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
              <ListItemText id={labelId}>{value.description}</ListItemText>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  const leftChecked = intersection(checked, left);
  //   console.log("left", leftChecked);
  const rightChecked = intersection(checked, right);
  //   console.log("right", rightChecked);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log("rerender");
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleCloseStudentModal = () => {
    setAddStudentModalOpen(false);
  };

  // END T-LIST BOILER PLATE (FUNCTIONS FOR GETTING AND SUBMITTING DATA BELOW)--------------------------------------------------------------------------------------------------------------------------------------------------

  // 5) THIS IS THE HELPER FUNCTION TO THE FOURTH FUNCTION AND SENDS THE ARRAY OF IDS OF THE ENROLLED STUDENTS TO THE FOLLOWING ENDPOINT

  const submitEnrolledStudents = async (ids) => {
    await fetch(`api/classes/${currentClass}/update-enrollment`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    });
    const updatedClasses = await fetchClassrooms(currentUserId);
    dispatch(setUserClasses(updatedClasses));
  };

  // 4) THIS THE FUNCTION THAT IS RUN AFTER CLICKING THE 'ENROLL STUDENTS' BUTTON OF THE T-LIST
  // IT LOOPS THROUGH ALL OF THE STUDENTS IN THE ENROLLED ARRAY (CALLED 'RIGHT' AND IS IN THE LOCAL STATE) AND EXTRACTS
  // THE STUDENT ID AND ADDS THIS ID TO AN ARRAY CALLED IDS

  const updateEnrollment = () => {
    handleCloseStudentModal();

    let isNumber = true;
    ids = right.map((student) => student.id);
    //  {
    //   isNumber = true;
    //   id = [];
    //   let i = student.length - 1;
    //   while (isNumber === true) {
    //     if (typeof (Number(student[i])) == 'number') {
    //       // console.log('what is this madness', Number(student[i]))
    //       id.unshift(student[i]);
    //       // console.log('id:   ', id)
    //       i -= 1;
    //       continue;
    //     } else {
    //       // console.log('id:  bottom   ', id)
    //       let currentId = id.join('');
    //       Number(currentId);
    //       ids.push(currentId);
    //       isNumber = BsFillPauseFill;
    //     }
    //   }
    // });

    submitEnrolledStudents(ids);
  };

  // 3) THIS IS THE HELPER FUNCTION OF THE SECOND FUNCTION THAT KEEPS TRACK OF ALL OF THE ENROLLED STUDENTS BY THEIR ID.
  // THIS IS LATER USED AS A REFERENCE WHEN POPULATING THE 'NOT ENROLLED' SECTION BY COMPARING EVERY STUDENT ID TO THE
  // STUDENT IDS THAT ARE ENROLLED IN ORDER TO DETERMINE WHICH IDS BELONG TO THE 'NOT ENROLLED SECTION'
  const populateEnrolledStudentIdsArray = (enrolledStudents) => {
    const studentIds = [];
    enrolledStudents.forEach((student) => {
      studentIds.push(student.id);
    });
    // setEnrolledStudentIds(studentIds)
    test.push(...studentIds);
  };

  // 2) THIS IS THE HELPER FUNCTION OF THE FIRST FUNCTION THAT POPULATES THE ARRAY THAT IS THEN USED BY THE TRANSFER LIST
  // CODE IN THE 'COMPONENT RETURN STATEMENT' TO DISPLAY THE CONTENT OF THE 'ENROLLED' SECTION OF THE TRANSFER LIST

  const populateEnrolledStudentsArray = (classId) => {
    const enrolledStudents = [];

    allClassrooms.forEach((classroom) => {
      if (classroom.id === Number(classId)) {
        populateEnrolledStudentIdsArray(classroom.students);
        classroom.students.forEach((student) => {
          enrolledStudents.push({
            description: `${student.first_name} ${student.last_name} - Student id: ${student.id}`,
            id: student.id,
          });
        });
      }
    });
    setRight(enrolledStudents);
  };

  // 1) THIS FUNCTION IS RUN WHEN YOU CLICK THE 'ENROLL STUDENTS' BUTTON AND ITS PURPOSE IS TO POPULATE THE 'NOT ENROLLED' AND
  // 'ENROLLED' SECTIONS OF THE T-LIST BEFORE ANY CHANGES ARE MADE TO THE LIST BY MOVING STUDENTS

  const handlePopulateTransferList = async (classId) => {
    setCurrentClass(classId);
    const unEnrolledStudents = [];

    await populateEnrolledStudentsArray(classId);
    // const res = await fetch(`api/classes/${classId}/students`);
    const res = await fetch(`api/students`);
    const allStudentsArr = await res.json();
    console.log("allStudentsArr:");
    console.log(allStudentsArr);
    allStudentsArr.forEach((student) => {
      if (!test.includes(student.id)) {
        unEnrolledStudents.push({
          description: `${student.first_name} ${student.last_name} - Student id: ${student.id}`,
          id: student.id,
        });
      }
    });
    setLeft(unEnrolledStudents);

    setAddStudentModalOpen(true);
  };

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------

  // END T-LIST SECTION

  // COMPONENT RETURN STATEMENT ----------------------------------------------------------------------------------------------------

  return (
    <div className={classes.Container}>
      <Typography variant="h3" align="center">
        My Classes
      </Typography>
      <div className={classes.outlined}>
        {allClassrooms.map((classroom, idx) => {
          return (
            <>
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
                <CardActions
                  className="classroom-buttons-container"
                  id={"HERE"}
                >
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
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ color: "white" }}
                    size="small"
                    onClick={() => {
                      handlePopulateTransferList(classIds[idx]);
                    }}
                  >
                    Enroll Students
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ color: "white" }}
                    size="small"
                    onClick={() => {
                      handleDeactivateConfirmation(classIds[idx]);
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </>
          );
        })}
        <Card className={classes.addClass}>
          <CardContent className={classes.cardcontent}>
            <h2>Add Class</h2>
            <Button style={{ maxWidth: "5px" }} size="small">
              <BsPlusSquare size={25} onClick={handleAddClass} />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* CODE FOR THE DELETE CLASS DIALOG BOX */}

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure that you want to delete this class?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClassDelete} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {/* CODE FOR THE ADD A CLASS MODAL */}

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {addClassBody}
      </Modal>

      {/* CODE FOR THE TRANSFER LIST AND MODAL THAT CONTAINS IT */}

      <Modal open={addStudentModalOpen} onClose={handleCloseStudentModal}>
        {/* {tListHeadings} */}

        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          className={
            matches === true
              ? classes.enrollStudentsModal
              : classes.enrollStudentsModalSmall
          }
        >
          <Grid item>
            <div>
              <h1>Not Enrolled</h1>
            </div>
            {customList(left)}
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>

              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>

              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>

              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid>
            <div>
              <h1>Enrolled</h1>
            </div>
            {customList(right)}
          </Grid>

          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
            size="small"
            onClick={updateEnrollment}
          >
            Enroll Students
          </Button>
        </Grid>
      </Modal>
    </div>
  );
};

export default InstructorClassrooms;
