import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentClassroom } from "../../store/current_classroom";

const AllClassrooms = () => {
  const dispatch = useDispatch();
  const classrooms = useSelector((state) => state.classrooms);
  const currentUser = useSelector((state) => state.currentUser);

  const handleViewClassroom = async (e) => {
    e.preventDefault();
    dispatch(setCurrentClassroom(e.target.value));
  };

  if (!classrooms) return null;
  if (!currentUser) return null;

  return (
    <>
      <h1 className="classroom__grid-title">All Classrooms</h1>
      <div className="classroom__grid">
        {Object.values(classrooms).map((classroom) => {
          return (
            <div key={`cs-${classroom.id}`} className="classroom__grid-item">
              <h3>{classroom.name}</h3>
              <p>Size: {classroom.size}</p>
              <button value={classroom.id} onClick={handleViewClassroom}>
                View
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllClassrooms;
