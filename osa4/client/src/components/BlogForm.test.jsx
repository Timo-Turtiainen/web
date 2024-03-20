import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("ensure blog form has correct inputs", async () => {
    
    
    const user = userEvent.setup()
    const handleAddBlog = vi.fn()

    const user1 = {
        username : "AAA",
        name : "Aku"
    }
    

    render(<BlogForm user={user1} handleAddBlog={handleAddBlog} />)

    const inputs = screen.getAllByRole('textbox')

    const saveButton = screen.getByText("Save")

    await user.type(inputs[0], "test title")
    await user.type(inputs[1], "test author")
    await user.type(inputs[2], "test url")

    await user.click(saveButton)

    console.log(handleAddBlog.mock.calls[0][0])
    expect(handleAddBlog.mock.calls).toHaveLength(1)
    expect(handleAddBlog.mock.calls[0][0].title).toBe( "test title")
    expect(handleAddBlog.mock.calls[0][0].author).toBe( "test author")
    expect(handleAddBlog.mock.calls[0][0].url).toBe( "test url")
    
})