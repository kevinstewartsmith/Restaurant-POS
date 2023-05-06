import { useState } from "react";
import { createTable } from "../../helper/table";
import { useQueryClient, useMutation } from "react-query";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

function RestaurantForm() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createTable,
    onSettled: () => {
      queryClient.invalidateQueries("tables");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name && status) {
      mutate({ name, status });
      setName("");
      setStatus("");
    } else {
      toast.error("Please fill all required fields");
    }
  };

  if (isLoading) {
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
              type="text"
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
              type="text"
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <button
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="submit"
          >
            Create Table
          </button>
        </form>
      </div>
    </div>
  );
}

export default RestaurantForm;
