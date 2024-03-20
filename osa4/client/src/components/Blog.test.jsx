import { render, screen, fireEvent } from "@testing-library/react";
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

  const element = screen.getByText("title title test author");
  // screen.debug(element)
  expect(element).toBeDefined();
});

test("after pressing view button show also url and likes  ", () => {
  const blog = {
    title: "title title",
    author: "test author",
    url: "test url",
    likes: 0,
    user: {
      username: "AAA",
      name: "Aku Ankka",
    },
  };

  render(<Blog blog={blog} />);
  // initial state
  const button = screen.getByText("view");
  expect(button).toHaveTextContent("view");
  fireEvent.click(button);
  // after one press text should be hide
  expect(button).toHaveTextContent("hide");
  fireEvent.click(button);
  // after second press text should be view
  expect(button).toHaveTextContent("view");
});

// 5.15 and 5.16 NOT READY!!!!

test("count the presses of like button", async () => {
  
  const blog = {
    title: "title title",
    author: "test author",
    url: "test url",
    likes: 0,
    user: {
      username: "AAA",
      name: "Aku Ankka",
    },
  };

  const mockHandler = vi.fn()
  const user = userEvent.setup()
 render(<Blog blog={blog} user={blog.user} handleLikes={mockHandler} />)
  // open view

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})