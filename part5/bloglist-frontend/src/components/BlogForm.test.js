import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  test('blog is created when form is submitted', async () => {
    const mockHandler = jest.fn()

    render(<BlogForm handleSubmit={mockHandler}/>)

    const title = screen.getByPlaceholderText('enter title')
    const author = screen.getByPlaceholderText('enter author')
    const url = screen.getByPlaceholderText('enter url')

    userEvent.type(title, 'Test Blog')
    userEvent.type(author, 'Test Author')
    userEvent.type(url, 'Test Url')

    const user = userEvent.setup()
    const button = screen.getByText('create')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})