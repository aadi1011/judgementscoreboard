import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TrickInput from "./TrickInput";

function Harness({ round, activePlayers, initialTricks = [], onComplete = () => {} }) {
  const [tricks, setTricks] = React.useState(initialTricks);
  return (
    <TrickInput
      round={round}
      activePlayers={activePlayers}
      tricks={tricks}
      setTricks={setTricks}
      onComplete={onComplete}
    />
  );
}

const players = [{ name: "Alice" }, { name: "Bob" }];

test("submitting a trick records the winner and advances progress", () => {
  render(<Harness round={2} activePlayers={players} />);
  fireEvent.change(screen.getByLabelText(/Game winner select/i), { target: { value: "Alice" } });
  fireEvent.click(screen.getByText("Submit"));
  expect(screen.getByText("Games completed: 1 / 2")).toBeInTheDocument();
});

test("undo button is disabled when no tricks have been recorded", () => {
  render(<Harness round={2} activePlayers={players} />);
  expect(screen.getByText("Undo Last Trick")).toBeDisabled();
});

test("undo removes the last recorded trick and reopens the selector after confirmation", () => {
  render(<Harness round={2} activePlayers={players} />);
  fireEvent.change(screen.getByLabelText(/Game winner select/i), { target: { value: "Alice" } });
  fireEvent.click(screen.getByText("Submit"));
  expect(screen.getByText("Games completed: 1 / 2")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Undo Last Trick"));
  // Confirmation modal should appear
  expect(screen.getByText(/Undo the last recorded winner/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText("Yes, Undo"));

  expect(screen.getByText("Games completed: 0 / 2")).toBeInTheDocument();
  expect(screen.getByText("Trick 1: Who won?")).toBeInTheDocument();
});

test("cancelling the undo confirmation keeps the trick recorded", () => {
  render(<Harness round={2} activePlayers={players} />);
  fireEvent.change(screen.getByLabelText(/Game winner select/i), { target: { value: "Bob" } });
  fireEvent.click(screen.getByText("Submit"));

  fireEvent.click(screen.getByText("Undo Last Trick"));
  fireEvent.click(screen.getByText("Cancel"));

  expect(screen.getByText("Games completed: 1 / 2")).toBeInTheDocument();
});

test("onComplete is only called when the corrected trick list matches the round length", () => {
  const onComplete = jest.fn();
  render(<Harness round={1} activePlayers={players} onComplete={onComplete} />);
  fireEvent.change(screen.getByLabelText(/Game winner select/i), { target: { value: "Alice" } });
  fireEvent.click(screen.getByText("Submit"));
  expect(onComplete).toHaveBeenCalledWith(["Alice"]);
});
