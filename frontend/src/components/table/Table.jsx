import { deleteTable } from "../../helper/table";
import { useQueryClient, useMutation } from "react-query";
import Spinner from "../Spinner";
import { AiFillDelete } from "react-icons/ai";

function Table({ table }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteTable,
    onSettled: () => {
      queryClient.invalidateQueries("tables");
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg shadow-gray-700">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{table.name}</div>
        <p className="text-base">
          Status: {parseInt(table.status) === 1 ? "Occupied" : "Available"}
        </p>

        <button
          onClick={() => mutate(table._id)}
          className="text-xl font-bold leading-tight tracking-tight text-red-500 md:text-xl dark:text-red"
        >
          Delete Table <AiFillDelete className="inline-block" />
        </button>
      </div>
    </div>
  );
}

export default Table;
