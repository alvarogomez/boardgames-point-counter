import { useState } from 'react';

import styles from './App.module.scss';
import { AddPlayerForm } from './components/AddPlayerForm/AddPlayerForm';
import { PlayerDisplay } from './components/PlayerDisplay/PlayerDisplay';
import classNames from 'classnames';

export type Player = {
  nickName: string;
  playerColor: string;
};

function App() {
  const [currentView, setCurrentView] = useState('EDIT');
  const AVAILABLE_COLORS_FOR_PLAYERS = [
    'Red',
    'Green',
    'Blue',
    'Pink',
    'Yellow',
    'Orange',
    'Purple',
    'Black',
  ];
  const [players, setPlayers] = useState<Player[]>([]);

  const setAddPlayerView = () => {
    setCurrentView('ADD');
  };
  const setEditView = () => {
    setCurrentView('EDIT');
  };
  const setGameView = () => {
    setCurrentView('GAME');
  };

  const updatePlayerList = (newPlayer: Player) => {
    const updatedPlayers = [
      ...players,
      {
        nickName: newPlayer.nickName,
        playerColor: newPlayer.playerColor,
        points: 0,
      },
    ];
    setPlayers(updatedPlayers);
    setEditView();
  };

  const deletePlayerFromList = (playerToDelete: Player) => {
    const updatedPlayers = players.filter(
      (player) => player.playerColor !== playerToDelete.playerColor,
    );
    setPlayers(updatedPlayers);
  };

  const getUnavailableColors = () => {
    return players.map((player) => player.playerColor);
  };

  return (
    <div className={styles.appContainer}>
      <section className={styles.appWrapper}>
        {currentView !== 'ADD' && (
          <header className={styles.appHeader}>
            {currentView === 'EDIT' && (
              <button
                data-testid="add-player-button"
                className={classNames(styles.primaryButton, styles.button, styles.smallButton)}
                onClick={setAddPlayerView}>
                Add new player
              </button>
            )}
            {currentView === 'EDIT' && (
              <button
                data-testid="start-game-button"
                className={classNames(styles.secondaryButton, styles.button, styles.smallButton)}
                onClick={setGameView}>
                Start Game
              </button>
            )}
            {currentView === 'GAME' && (
              <button
                data-testid="edit-game-button"
                className={classNames(styles.primaryButton, styles.button, styles.smallButton)}
                onClick={setEditView}>
                Edit
              </button>
            )}
          </header>
        )}
        {currentView === 'ADD' && (
          <AddPlayerForm
            updatePlayerList={updatePlayerList}
            listOfColors={AVAILABLE_COLORS_FOR_PLAYERS}
            getUnavailableColors={getUnavailableColors}
          />
        )}
        {currentView !== 'ADD' &&
          players &&
          players.map((player, index) => (
            <PlayerDisplay
              key={`${index}-${player.nickName}`}
              player={player}
              currentView={currentView}
              deletePlayer={deletePlayerFromList}
            />
          ))}
      </section>
    </div>
  );
}

export default App;
