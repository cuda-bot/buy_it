import React from "react";
import Layout from "../../components/LAYOUTS/Layout";
import AdminMenu from "../../components/LAYOUTS/AdminMenu";
import { useAuthContext } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuthContext();
  return (
    <Layout>
      <div className="container-fluid m-3 p-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            content
            <div className="card w-75 p-3">
              <h3>Admin Name: {auth?.user?.name}</h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
