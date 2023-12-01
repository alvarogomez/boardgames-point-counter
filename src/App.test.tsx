import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('APP general operations', () => {
  it('should add a new player to the list after completing the form', async () => {
    render(<App />);
    const addButton: HTMLButtonElement = screen.getByTestId('add-player-button');
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    const nameInput: HTMLInputElement = screen.getByTestId('name-input');
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'myNickName' } });
    expect(nameInput.value).toBe('myNickName');

    const colorSelector: HTMLSelectElement = screen.getByTestId('color-selector');
    fireEvent.change(colorSelector, { target: { value: 'Red' } });
    expect(colorSelector.value).toBe('Red');

    const createPlayerButton: HTMLButtonElement = screen.getByTestId('create-player-btn');
    expect(createPlayerButton).toBeInTheDocument();
    fireEvent.click(createPlayerButton);

    expect(nameInput).not.toBeInTheDocument();
    expect(colorSelector).not.toBeInTheDocument();
    expect(createPlayerButton).not.toBeInTheDocument();
    expect(screen.getByText('myNickName')).toBeInTheDocument();
  });

  it('should be able to delete a player from the list', () => {
    render(<App />);
    const addButton: HTMLButtonElement = screen.getByTestId('add-player-button');
    fireEvent.click(addButton);

    const nameInput: HTMLInputElement = screen.getByTestId('name-input');
    fireEvent.change(nameInput, { target: { value: 'myNickName' } });

    const colorSelector: HTMLSelectElement = screen.getByTestId('color-selector');
    fireEvent.change(colorSelector, { target: { value: 'Red' } });

    const createPlayerButton: HTMLButtonElement = screen.getByTestId('create-player-btn');
    fireEvent.click(createPlayerButton);
    const playerRedDisplay = screen.getByTestId('player-red-display');

    expect(playerRedDisplay).toBeInTheDocument();

    const deletePlayerButton: HTMLButtonElement = screen.getByTestId('delete-player-red-btn');
    fireEvent.click(deletePlayerButton);

    expect(playerRedDisplay).not.toBeInTheDocument();
  });

  it('should be able to change a player scoring after starting a game', () => {
    render(<App />);
    const addButton: HTMLButtonElement = screen.getByTestId('add-player-button');
    fireEvent.click(addButton);

    const nameInput: HTMLInputElement = screen.getByTestId('name-input');
    fireEvent.change(nameInput, { target: { value: 'myNickName' } });

    const colorSelector: HTMLSelectElement = screen.getByTestId('color-selector');
    fireEvent.change(colorSelector, { target: { value: 'Red' } });

    const createPlayerButton: HTMLButtonElement = screen.getByTestId('create-player-btn');
    fireEvent.click(createPlayerButton);
    const playerRedDisplay = screen.getByTestId('player-red-display');

    expect(playerRedDisplay).toBeInTheDocument();

    const startButton: HTMLButtonElement = screen.getByTestId('start-game-button');
    fireEvent.click(startButton);

    expect(addButton).not.toBeInTheDocument();
    let redPoints = screen.getByTestId('points-red').innerHTML;

    expect(redPoints).toBe('0');

    const increase: HTMLButtonElement = screen.getByTestId('plus-red');
    expect(increase).toBeInTheDocument();
    fireEvent.click(increase);
    fireEvent.click(increase);
    fireEvent.click(increase);
    const decrease: HTMLButtonElement = screen.getByTestId('minus-red');
    fireEvent.click(decrease);
    fireEvent.click(decrease);
    redPoints = screen.getByTestId('points-red').innerHTML;
    expect(redPoints).toBe('1');
  });

  it('should be able to edit a game after being started', () => {
    render(<App />);
    const addButton: HTMLButtonElement = screen.getByTestId('add-player-button');
    fireEvent.click(addButton);

    const nameInput: HTMLInputElement = screen.getByTestId('name-input');
    fireEvent.change(nameInput, { target: { value: 'myNickName' } });

    const colorSelector: HTMLSelectElement = screen.getByTestId('color-selector');
    fireEvent.change(colorSelector, { target: { value: 'Red' } });

    const createPlayerButton: HTMLButtonElement = screen.getByTestId('create-player-btn');
    fireEvent.click(createPlayerButton);
    const playerRedDisplay = screen.getByTestId('player-red-display');

    expect(playerRedDisplay).toBeInTheDocument();

    const startButton: HTMLButtonElement = screen.getByTestId('start-game-button');
    fireEvent.click(startButton);

    expect(addButton).not.toBeInTheDocument();
    let redPoints = screen.getByTestId('points-red').innerHTML;

    expect(redPoints).toBe('0');

    const editButton: HTMLButtonElement = screen.getByTestId('edit-game-button');
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);

    expect(playerRedDisplay).toBeInTheDocument();

    const deletePlayerButton: HTMLButtonElement = screen.getByTestId('delete-player-red-btn');
    fireEvent.click(deletePlayerButton);

    expect(playerRedDisplay).not.toBeInTheDocument();
  });
});
