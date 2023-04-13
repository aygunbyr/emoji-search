import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import emojiList from "../emojiList.json";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Emoji results tests", () => {
  test("initially emoji results are rendered", () => {
    // Render App component
    render(<App />);

    // Get first 20 emojis from *.json file
    let emojis = emojiList.slice(0, 20);

    // Check whether first 20 emoji is rendered successfully
    emojis.map((emoji) => {
      expect(screen.getByText(emoji.title)).toBeInTheDocument();
    });
  });

  test("emoji filter works and renders correct results", () => {
    // Render App Component
    const { getAllByText } = render(<App />);
    const emojiText = "Joy";

    // Type "Joy" to emoji input to filter emojis
    const input = screen.getByDisplayValue("");
    fireEvent.change(input, {
      target: { value: emojiText },
    });

    // Get all elements include "joy"
    const joyElements = screen.getAllByText(/Joy/);

    // Check whether there are three joy emojis
    expect(joyElements).toHaveLength(3);
  });

  test("clicked emoji is copied", () => {
    render(<App />);
    // Get innocent emoji
    const innocentEmoji = screen.getByText("Innocent");

    // Click on emoji
    userEvent.click(innocentEmoji);

    // Check whether is emoji copied to clipboard
    expect(
      innocentEmoji.parentElement.getAttribute("data-clipboard-text")
    ).toMatch("😇");
  });
});
