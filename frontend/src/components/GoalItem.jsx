import { deleteGoal } from "../helper/goals";
import { useQueryClient, useMutation } from "react-query";
import Spinner from "./Spinner";
import { AiFillDelete } from "react-icons/ai";

function GoalItem({ goal }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteGoal,
    onSettled: () => {
      queryClient.invalidateQueries("goals");
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-Us")}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => mutate(goal._id)} className="close">
        <AiFillDelete />
      </button>
    </div>
  );
}

export default GoalItem;
