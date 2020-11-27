import React, { useState, useEffect } from "react";
import { useDispatch, useSelect } from "react-redux";
import { setCurrentUser } from "../store/users";
import { useParams } from "react-router-dom";

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId } = useParams();

  // console.log(userId);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  dispatch(setCurrentUser(user));

  return (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>First Name</strong> {user.first_name}
      </li>
      <li>
        <strong>Last Name</strong> {user.last_name}
      </li>
      <li>
        <strong>Avatar Url</strong> {user.avatar_url ? user.avatar_url : ""}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      <li>
        <strong>Role</strong> {user.role}
      </li>
    </ul>
  );
}
export default User;
