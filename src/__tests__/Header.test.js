import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header tests", () => {
  test("header rendered successfully", () => {
    // Render component
    render(<Header />);

    // Expect header includes Emoji Search text
    expect(screen.getByText("Emoji Search")).toBeInTheDocument();
  });
});
