import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"SewChic - Admin Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-4">
            <h1> Admin Name : {auth?.user?.name}</h1>
            <h1> Admin Email : {auth?.user?.email}</h1>
            <h1> Admin contact : {auth?.user?.phone}</h1>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
