import React from "react";
import "./index.css";
import UsersTable from "./UsersTable";

const users = [
  {
    name: "Marcin",
    surname: "Warzybok"
  },
  {
    name: "Marcin",
    surname: "Warzybok"
  },
  {
    name: "Marcin",
    surname: "Warzybok"
  },
  {
    name: "Marcin",
    surname: "Warzybok"
  }
]

function AdminDashboard() {
  return (
    <React.Fragment>
      <h1>AdminDashboard</h1>
      <UsersTable users={users}/>
    </React.Fragment>
  );
}

export default AdminDashboard;
