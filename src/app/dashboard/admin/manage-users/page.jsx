import ManageUsersTable from "@/components/dashboardUi/adminUi/ManageUsersTable";
import React from "react";

const page = () => {
  const users = [
    {
      _id: "u1",
      name: "Mehedi Hasan",
      email: "mehedi@gmail.com",
      role: "admin",
      status: "active",
    },
    {
      _id: "u2",
      name: "Sakib Ahmed",
      email: "sakib@gmail.com",
      role: "member",
      status: "active",
    },
    {
      _id: "u3",
      name: "Tanvir Hossain",
      email: "tanvir@gmail.com",
      role: "trainer",
      status: "active",
    },
    {
      _id: "u4",
      name: "Asif Rahman",
      email: "asif@gmail.com",
      role: "member",
      status: "blocked",
    },
    {
      _id: "u5",
      name: "Fahim Hasan",
      email: "fahim@gmail.com",
      role: "member",
      status: "active",
    },
    {
      _id: "u6",
      name: "Nusrat Jahan",
      email: "nusrat@gmail.com",
      role: "trainer",
      status: "blocked",
    },
    {
      _id: "u7",
      name: "Arafat Islam",
      email: "arafat@gmail.com",
      role: "member",
      status: "active",
    },
    {
      _id: "u8",
      name: "Mahin Chowdhury",
      email: "mahin@gmail.com",
      role: "member",
      status: "blocked",
    },
  ];
  return (
    <div>
      <ManageUsersTable users={users} />
    </div>
  );
};

export default page;
