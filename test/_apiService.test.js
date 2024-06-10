import {
  newCard,
  getCard,
  updateCard,
  deleteCard,
  getColumnLabels,
} from "../src/_apiService.js";

test("api service responds", () => {
  let response = newCard();

  expect(response.ok).toBeTruthy();
});
