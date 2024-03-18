import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "title title",
    author: "test author",
    url: "test url",
    likes: 5,
    user: {
      username: "Test username",
      name: "Test name",
    },
  };

  render(<Blog blog={blog} />);

  const element = screen.findByText("title title");
  expect(element).toBeDefined();
});

test("like button toggle visibility"),
  async () => {
    const blog = {
      title: "title title",
      author: "test author",
      url: "test url",
      likes: 5,
      user: {
        username: "Test username",
        name: "Test name",
      },
    };
    const mockHandler = vi.fn();

    render(<Blog blog={blog} toggleVisibility={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  };
