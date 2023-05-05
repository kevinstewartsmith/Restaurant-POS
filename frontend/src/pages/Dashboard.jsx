import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "react-query";
import { getRestaurants } from "../helper/restaurant";
import { getUser } from "../helper/user";
import Restaurant from "../components/Restaurant";

function Dashboard() {
  const navigate = useNavigate();

  const user = getUser();

  const { isLoading, data } = useQuery("restaurants", () =>
    getRestaurants(user.token)
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Restaurants Dashboard</p>
      </section>

      <section className="content">
        {data.length > 0 ? (
          <div className="goals">
            {data.map((restaurant) => (
              <Restaurant key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
