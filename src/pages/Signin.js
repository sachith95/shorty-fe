import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Layout from "../Layout";
import { toast } from "react-toastify";

const Signin = (props) => {
  const { register, handleSubmit, errors } = useForm();
  console.log(errors);
  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const res = await axios.post(
        "http://127.0.0.1:8000/oauth/token",
        {
          username: email,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          password: password,
          grant_type: "password",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // get token and store in localStorage
      const { access_token, refresh_token, token_type } = res.data;
      global.auth.setToken({ access_token, refresh_token, token_type });

      // redirect to home page
      toast.success("Sign in successfully! Redirect to main page ...", {
        autoClose: 1000,
      });
      setTimeout(function () {
        props.history.push("/");
      }, 1500);
    } catch (err) {
      toast.error("Wrong email or password, please try again", {
        autoClose: 1000,
      });
    }
  };

  return (
    <Layout>
      <div className="userForm">
        <form
          className="userForm__container d-flex flex-column"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="userForm__container__title">Sign in</div>
          <div className="userForm__container__field d-flex flex-column">
            <label htmlFor="" className="input__label">
              Email Hi {process.env.REACT_APP_NAME}
            </label>
            <input
              type="text"
              placeholder="Email"
              className="input__field"
              name="email"
              ref={register({
                required: "Email is required",
                pattern: {
                  value:
                    /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/,
                  message: "invalid email",
                },
              })}
            />
            {/* error message */}
            {errors.email && (
              <p className="error__message">{errors.email.message}</p>
            )}
          </div>
          <div className="userForm__container__field d-flex flex-column">
            <label htmlFor="" className="input__label">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input__field"
              name="password"
              ref={register({
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "min length is 6",
                },
              })}
            />
            {errors.password && (
              <p className="error__message">{errors.password.message}</p>
            )}
          </div>
          <div className="userForm__container__control d-flex flex-column">
            <button type="submit" className="submitButton">
              Sign in
            </button>
            <Link to="/users/signup">
              <button className="switchButton" type="button">
                Sign up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signin;
