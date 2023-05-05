import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getUser, register } from "../helper/user";
import { useMutation } from "react-query";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();

  const { data, error, mutate, isLoading, isError, isSuccess } = useMutation(
    (variables) => register(variables)
  );
  
  const user = getUser();

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }

    if (isSuccess || user) {
      navigate("/");
    }
  }, [user, isError, isSuccess, navigate, error]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      mutate(userData);

      if (isLoading) {
        return <Spinner />;
      }

      if (isError) {
        toast.error(error);
      }

      if (data) {
        navigate("/");
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>

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
            <input
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              type="password"
              placeholder="Confirm your password"
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

export default Register;
