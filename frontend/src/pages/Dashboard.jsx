import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "react-query";
import { getRestaurants } from "../helper/restaurant";
import { getUser } from "../helper/user";
import Restaurant from "../components/Restaurant";
import RestaurantForm from "../components/RestaurantForm";

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
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="justify-center px-6  mx-auto md:h-screen lg:py-0 text-white">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Welcome {user && user.name}
          </h1>
        </div>

        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <RestaurantForm />
        </div>

        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {data.length > 0 ? (
            <div>
              {data.map((restaurant) => (
                <Restaurant key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              You do not have any restaurants
            </h3>
          )}
        </div>
        <div />
      </div>
    </div>
  );
}

export default Dashboard;
