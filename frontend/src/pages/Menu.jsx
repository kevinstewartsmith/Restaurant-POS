import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "react-query";
import { getMenus } from "../helper/menu";
import { getUser } from "../helper/user";
import MenuList from "../components/menu/Menu";
import MenuForm from "../components/menu/MenuForm";

function Menu() {
    const navigate = useNavigate();

    const user = getUser();
  
    const { isLoading, data } = useQuery("menus", () =>
      getMenus(user.token)
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
      <div className="justify-center px-6 lg:py-0 text-white">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Welcome {user && user.name}
          </h1>
        </div>

        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <MenuForm />
        </div>

        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {data.length > 0 ? (
            <div>
              {data.map((menu) => (
                <MenuList key={menu._id} menu={menu} />
              ))}
            </div>
          ) : (
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              You do not have any menus
            </h3>
          )}
        </div>
        <div />
      </div>
    </div>
  );
}

export default Menu;
