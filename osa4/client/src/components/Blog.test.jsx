import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";


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

  render(<Blog blog={blog} />)
  
  const element = screen.getByText("title title test author")
  // screen.debug(element)
  expect(element).toBeDefined()
})

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

  render(<Blog blog={blog} /> )
  // initial state 
  const button = screen.getByText("view")
  expect(button).toHaveTextContent("view")
  fireEvent.click(button)
  // after one press text should be hide
  expect(button).toHaveTextContent("hide")
  fireEvent.click(button)
  // after second press text should be view
  expect(button).toHaveTextContent("view")

})

// 5.15 and 5.16 NOT READY!!!!
// test("count the presses of likes button", async () => {
  
//   const blog = {
//     title: "title title",
//     author: "test author",
//     url: "test url",
//     likes: 0,
//     user: {
//       username: "AAA",
//       name: "Aku Ankka",
//     },
//   };

//   const user = userEvent.setup()
//   const onClick = vi.fn()
  
//   render(<Blog blog={blog} user={blog.user } />)

//   const button = screen.getAllByRole("button")
//   await user.click(button[0])
//   expect(onClick).toHaveBeenCalledOnce()

  // const viewButton = screen.getByText("view")
  // await fireEvent.click(viewButton)

  // const likesButton = screen.getByText("like")
  // await fireEvent.click(likesButton)
  
  // const likesElement = screen.getByText(/Likes 0/i)
  
  // expect(likesElement).toHaveTextContent(/Likes 1/i)

// })

// test("test blogForm", async () => {

//   const blog = {
//     title: "title title",
//     author: "test author",
//     url: "test url",
//     likes: 0,
//     user: {
//       username: "AAA",
//       name: "Aku Ankka",
//     },
//   };


//   const user = userEvent.setup()
//   const addBlogs = vi.fn()

//   render(<BlogForm blog={blog} user={blog.user} addBlogs={addBlogs} />)

//   const input = screen.getAllByRole("textbox")

//   const sendButton = screen.getByText("Save")
  
//   await user.type(input[0], "testing a form...1")
//   await user.type(input[1], "testing a form...2")
//   await user.type(input[2], "testing a form...3")
//   await user.click(sendButton)

//   expect(addBlogs.mock.calls).toHavelength(1)
//   expect(addBlogs.mock.calls[0][0]).toBe("testing a form...1")
  
// })