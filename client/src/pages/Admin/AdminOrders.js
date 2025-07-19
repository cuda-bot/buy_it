import React, { useState, useEffect } from "react";
import Layout from "../../components/LAYOUTS/Layout";
import AdminMenu from "../../components/LAYOUTS/AdminMenu";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import { useAuthContext } from "../../context/auth";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuthContext();
  const getOrders = async () => {
    try {
      const res = await axios.get("/api/v1/auth/all-orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const handleChange = async (oid, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${oid}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row p-5">
        <div className="col-md-3 p-5">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center p-3">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          variant={false}
                          onChange={(value) => {
                            handleChange(o._id, value);
                          }}
                          defaultValue={o?.status}
                        >
                          {/* status is not defined, so this loop will not render */}
                          {/* {status.map((s, i) => ( */}
                          {/*   <Option key={i} value={s}> */}
                          {/*     {s} */}
                          {/*   </Option> */}
                          {/* ))} */}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    // Add the key prop here
                    <div key={p._id} className="row mb-2 card p-3 flex-row">
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
