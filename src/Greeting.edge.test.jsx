// @vitest-environment jsdom
// Extra edge-case tests for the bonus
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('Greeting edge cases', () => {
  it('treats a whitespace-only name as empty', async () => {
    const user = userEvent.setup();
    render(<Greeting />);
    await user.type(screen.getByLabelText('Your name'), '   ');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
  });

  it('clears the error once a valid name is submitted', async () => {
    const user = userEvent.setup();
    render(<Greeting />);
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Your name'), 'Brian');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(await screen.findByText(/Hello, Brian!/)).toBeInTheDocument();
  });

  it('keeps the typed value in the input', async () => {
    const user = userEvent.setup();
    render(<Greeting />);
    const input = screen.getByLabelText('Your name');
    await user.type(input, 'Amina');
    expect(input).toHaveValue('Amina');
  });
});
