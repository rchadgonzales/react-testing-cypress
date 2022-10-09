import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

// test("on initial render, the pay button is disabled", async () => {
//   render(<TransactionCreateStepTwo sender={{ id: "3" }} receiver={{ id: "3" }} />);
test("if an amount and note is entered, the pay button becomes enabled", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "3" }} receiver={{ id: "3" }} />);
  // screen.debug();
  // screen.getByRole(" ");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();

  // screen.getByRole("");

  userEvent.type(screen.getByPlaceholderText(/amount/i), "30");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "coffee");

  // screen.getByRole("");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});
// });
