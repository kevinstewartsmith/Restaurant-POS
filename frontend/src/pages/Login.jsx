import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../helper/user";
import Spinner from "../components/Spinner";
import { useMutation } from "react-query";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const user = getUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { data, error, mutate, isLoading } = useMutation((variables) =>
    login(variables)
  );

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    mutate(userData);

    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      console.log(error);
    }

    if (data) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              id="email"
              name="email"
              value={email}
              type="email"
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              id="password"
              name="password"
              value={password}
              type="password"
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
