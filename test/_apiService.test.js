import {
  newCard,
  getCard,
  updateCard,
  deleteCard,
  getColumnLabels,
} from "../src/_apiService.mjs";

test("api service responds", () => {
  let response = newCard();

  expect(response.ok).toBeTruthy();
});
