import { deleteRestaurant } from "../../helper/restaurant";
import { useQueryClient, useMutation } from "react-query";
import Spinner from "../Spinner";
import { AiFillDelete } from "react-icons/ai";

function Restaurant({ restaurant }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteRestaurant,
    onSettled: () => {
      queryClient.invalidateQueries("restaurants");
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  const selectDefaultRestaurant = (id) => {
    localStorage.setItem("restaurant", id);
    window.location.reload(false);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg shadow-gray-700">
      <img
        className="w-full"
        src={restaurant.photo ? restaurant.photo : "boilerplate-image.jpg"}
        alt="Restaurant"
      />
      <div className="px-6 py-4">
        <p className="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-xl dark:text-blue">{localStorage.getItem("restaurant") === restaurant._id ? 'Selected Retaurant' : ''}</p>
        <div className="font-bold text-xl mb-2">{restaurant.name}</div>
        <p className="text-base">{restaurant.description}</p>

        <button
          onClick={() => mutate(restaurant._id)}
          className="text-xl font-bold leading-tight tracking-tight text-red-500 md:text-xl dark:text-red"
        >
          Delete Restaurant <AiFillDelete className="inline-block" />
        </button>

        <button
          onClick={() => selectDefaultRestaurant(restaurant._id)}
          className="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-xl dark:text-blue"
        >
          Select Default Restaurant
        </button>
      </div>
    </div>
  );
}

export default Restaurant;
