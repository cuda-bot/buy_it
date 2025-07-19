import React from "react";
import Layout from "../../components/LAYOUTS/Layout";
import UserMenu from "../../components/LAYOUTS/UserMenu";
import { useAuthContext } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuthContext();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            content
            <div className="card w-75 p-3">
              <h3>User Name: {auth?.user?.name}</h3>
              <h3>User Email: {auth?.user?.email}</h3>
              <h3>User Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
