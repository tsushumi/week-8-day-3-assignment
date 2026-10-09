// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('Greeting component', () => {
  it('renders correctly with heading and submit button', () => {
    render(<Greeting />);
    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('shows greeting after submitting a name', async () => {
    const user = userEvent.setup();
    render(<Greeting />);

    await user.type(screen.getByLabelText('Your name'), 'Brian');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('Hello, Brian! Welcome to Mctaba Academy.')
    ).toBeInTheDocument();
  });

  it('form submission updates the message', async () => {
    const user = userEvent.setup();
    render(<Greeting />);

    // Pressing Enter inside the input submits the form (no button click)
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Wanjiru{Enter}');

    expect(await screen.findByText(/Hello, Wanjiru!/)).toBeInTheDocument();
    // The form is replaced by the message
    expect(screen.queryByRole('button', { name: 'Submit' })).not.toBeInTheDocument();
  });

  it('shows loading state after submit', async () => {
    render(<Greeting />);

    // fireEvent is synchronous, so "Loading..." is checked before the 100ms timer fires
    fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Brian' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Let the timer finish so no state update leaks past the end of the test
    expect(await screen.findByText(/Hello, Brian!/)).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('shows error when name is empty', async () => {
    const user = userEvent.setup();
    render(<Greeting />);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
  });
});
