import { useState } from "react";
import { createMenu } from "../../helper/menu";
import { useQueryClient, useMutation, useQuery } from "react-query";
import Spinner from "../Spinner";
import { getRestaurants } from "../../helper/restaurant";
import { getUser } from "../../helper/user";
import { toast } from "react-toastify";

function MenuForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [restaurant, setRestaurant] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createMenu,
    onSettled: () => {
      queryClient.invalidateQueries("menus");
    },
  });

  const user = getUser();
  const { data, loading: queryLoading } = useQuery("restaurants", () =>
    getRestaurants(user.token)
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (name && description && restaurant) {
      mutate({ name, description, restaurant });
      setName("");
      setDescription("");
      setRestaurant("");
    } else {
      toast.error("Please fill all required fields");
    }
  };

  if (isLoading || queryLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="space-y-4 md:space-y-6 p-2">
        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="text"
            >
              Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="name"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="text"
            >
              Description
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="description"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="resturant"
            >
              Restaurant
            </label>

            {data && data.length > 0 ? (
              <select
                onChange={(e) => setRestaurant(e.target.value)}
                name="restaurant"
                id="restaurant"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Select Menu</option>
                {data.map((restaurant) => (
                  <option key={restaurant._id} value={restaurant._id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            ) : (
              <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                You do not have any restaurants - please create restaurant
                before creating menu.
              </h3>
            )}
          </div>

          <button
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="submit"
          >
            Create Menu
          </button>
        </form>
      </div>
    </div>
  );
}

export default MenuForm;
