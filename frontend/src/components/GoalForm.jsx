import { useState } from "react";
import { createGoal } from "../helper/goals";
import { useQueryClient, useMutation } from "react-query";
import Spinner from "./Spinner";

function GoalForm() {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createGoal,
    onSettled: () => {
      queryClient.invalidateQueries("goals");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    mutate({ text });
    setText("");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
