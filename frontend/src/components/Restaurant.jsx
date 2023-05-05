import { deleteRestaurant } from "../helper/restaurant";
import { useQueryClient, useMutation } from "react-query";
import Spinner from "./Spinner";
import { AiFillDelete } from "react-icons/ai";

function Restaurant({ restaurant }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteRestaurant,
    onSettled: () => {
      queryClient.invalidateQueries("goals");
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="goal text-white">
      <div>{new Date(restaurant.createdAt).toLocaleString("en-Us")}</div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <button onClick={() => mutate(restaurant._id)} className="close">
        <AiFillDelete />
      </button>
    </div>
  );
}

export default Restaurant;
