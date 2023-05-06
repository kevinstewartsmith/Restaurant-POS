import { deleteMenuItem } from "../../helper/menuItem";
import { useQueryClient, useMutation } from "react-query";
import Spinner from "../Spinner";
import { AiFillDelete } from "react-icons/ai";

function MenuItem({ menuItem }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteMenuItem,
    onSettled: () => {
      queryClient.invalidateQueries("items");
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src={menuItem.photo ? menuItem.photo : "boilerplate-image.jpg"}
        alt="menuItem"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{menuItem.name}</div>
        <p className="text-base">{menuItem.description}</p>
        <p className="text-base">{menuItem.price}</p>

        <button
          onClick={() => mutate(menuItem._id)}
          className="text-xl font-bold leading-tight tracking-tight text-red-500 md:text-xl dark:text-red"
        >
          Delete Menu Item <AiFillDelete className="inline-block" />
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
