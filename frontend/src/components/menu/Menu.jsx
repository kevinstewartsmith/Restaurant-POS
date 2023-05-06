import { deleteMenu } from "../../helper/menu";
import { useQueryClient, useMutation } from "react-query";
import Spinner from "../Spinner";
import { AiFillDelete } from "react-icons/ai";

function Menu({ menu }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteMenu,
    onSettled: () => {
      queryClient.invalidateQueries("menus");
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src={menu.photo ? menu.photo : "boilerplate-image.jpg"}
        alt="Menu"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{menu.name}</div>
        <p className="text-base">{menu.description}</p>

        <button
          onClick={() => mutate(menu._id)}
          className="text-xl font-bold leading-tight tracking-tight text-red-500 md:text-xl dark:text-red"
        >
          Delete Menu <AiFillDelete className="inline-block" />
        </button>
      </div>
    </div>
  );
}

export default Menu;
