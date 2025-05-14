import React from "react";
import Layout from "./../components/LAYOUTS/Layout";

const About = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/147/279/original/young-man-and-woman-with-headphones-microphone-and-computer-customer-service-support-or-call-center-concept-free-vector.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            We are an E-Commerce platform where you will be able to find all
            that you need. Looking forward to be your one stop destination for
            all your shopping needs!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
