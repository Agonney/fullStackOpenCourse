import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {
  test('renders blog title and author', () => {
    const blog = {
      title: 'Test Blog Post',
      author: 'John Doe',
      url: 'www.google.com',
      likes: 12
    }

    const { container } = render(<Blog blog={blog} />)

    const element = screen.getByText('Test Blog Post John Doe')
    const div = container.querySelector('.blogDetails')

    expect(element).toBeDefined()
    expect(div).toBeNull()
  })

  test('renders blog details when show button is clicked', async () => {
    const blog = {
      title: 'Test Blog Post',
      author: 'John Doe',
      url: 'www.google.com',
      likes: 12,
      user: {
        name: 'Test Adder',
        username: 'Tester'
      }
    }

    const loggedUser = {
      name: 'Test Adder',
      username: 'Tester'
    }

    // const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} loggedUser={loggedUser}/>)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.blogDetails')
    expect(div).toBeDefined()
  })

  test('event handler called two times when button is pressed twice', async () => {
    const blog = {
      title: 'Test Blog Post',
      author: 'John Doe',
      url: 'www.google.com',
      likes: 12,
      user: {
        name: 'Test Adder',
        username: 'Tester'
      }
    }

    const loggedUser = {
      name: 'Test Adder',
      username: 'Tester'
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} loggedUser={loggedUser} handleLike={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})