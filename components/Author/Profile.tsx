import React from "react";
import { AuthorDataProps } from "./type";

function Profile({ created_at, email, id, name }: AuthorDataProps) {
  return (
    <div>
      <h2>{name}</h2>
      {/* <p>Created At: {created_at}</p> */}
      <p>Email: {email}</p>
      <hr />
    </div>
  );
}

export default Profile;
