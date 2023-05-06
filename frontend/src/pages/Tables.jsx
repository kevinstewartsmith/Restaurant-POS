import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "react-query";
import { getTables } from "../helper/table";
import { getUser } from "../helper/user";
import Table from "../components/table/Table";
import TableForm from "../components/table/TableForm";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

function Tables() {
  const navigate = useNavigate();

  const user = getUser();
  const [showForm, setShowForm] = useState("");

  const { isLoading, data } = useQuery("tables", () => getTables('64563a98dd06a71a9d2c5e29')); //TODO: make it possible to load current active restaurant 

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  const displayForm = () => {
    if (showForm) {
      setShowForm(0);
    } else {
      setShowForm(1);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="justify-center px-6 lg:py-0 text-white">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Welcome {user && user.name}
          </h1>
        </div>

        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <button onClick={() => displayForm()}>
            {showForm ? (
              <AiOutlineMinusCircle size={50} />
            ) : (
              <AiOutlinePlusCircle size={50} />
            )}
          </button>
          {showForm ? <TableForm /> : ""}
        </div>

        <div className="sm:p-8">
          {data.length > 0 ? (
            <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {data.map((table) => (
                <Table key={table._id} table={table} />
              ))}
            </div>
          ) : (
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              You do not have any tables
            </h3>
          )}
        </div>
        <div />
      </div>
    </div>
  );
}

export default Tables;
