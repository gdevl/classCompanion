import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { CardActionArea, CardActions, Grid, Paper } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px',
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    backgroundColor: theme.palette.secondary.light,
    background: theme.palette.success.light,
    color: theme.palette.secondary.contrastText,
    height: '200px',
    minWidth: '300px'
  },

  typography: {
    fontSize: theme.typography.fontSize
  },

  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    height: '70%',
    width: '100%'
  },

  outlined: {
    outline: '1px solid blue',
    margin: '0 auto'
  }
}));

let classrooms = []

const userId = 1

const InstructorClassrooms = () => {

  const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    const fetchClassData = async () => {
      const res = await fetch(`/api/users/${userId}/classes`)
      const classroomData = await res.json()
      setClassrooms(classroomData)
      // classrooms.push(classroomData)
      console.log(classroomData)
    }
    fetchClassData()

  }, [])

  const classes = useStyles()

  console.log(classrooms)
  return (
    <>
      <div className={classes.outlined}>
        <Grid container spacing={4} className={classes.grid} align='center'>
          {classrooms.map((classroom, idx) => {
            console.log('CLASSROOM', classroom.classSize)
            return (
              <Grid container item xs={12} md={6} lg={4} spacing={2}>

                <Card className={classes.paper}>
                  <CardContent className={classes.cardcontent}>
                    <div className="classroom-data">
                      <div className="classroom-name">
                        <h2>
                          {classroom.className}
                        </h2>
                      </div>
                      <div className="classroom-size">
                        <h4>
                          Class Size: {classroom.ClassSize}
                        </h4>
                      </div>
                      <div className="classroom-time">
                        <h4>
                          {classroom.ClassTime}
                        </h4>
                      </div>
                    </div>
                  </CardContent>
                  <CardActions className="classroom-buttons-container">
                    <Button variant="contained" color="primary" style={{ color: "white" }} size="small">View</Button>
                    <Button variant="contained" color="primary" style={{ color: "white" }} size="small">Enroll Students</Button>
                    <Button variant="contained" color="primary" style={{ color: "white" }} size="small">Deactivate</Button>
                  </CardActions>
                </Card>

              </Grid>
            )
          })}
        </Grid>
        {classrooms.forEach(classroom => {
          console.log('CLASSROOM DATA', classroom)
        })}
      </div>
    </>
  )
}


export default InstructorClassrooms;
