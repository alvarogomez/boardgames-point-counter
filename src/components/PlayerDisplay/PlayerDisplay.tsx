import React, { useState } from 'react';

import styles from './PlayerDisplay.module.scss';
import { Player } from '../../App';
import { DeleteIcon } from '../../icons/DeleteIcon';
import classNames from 'classnames';

export type PlayerDisplayProps = {
  player: Player;
  currentView: string;
  deletePlayer: (Player: Player) => void;
};

export const PlayerDisplay: React.FC<PlayerDisplayProps> = ({
  player,
  currentView,
  deletePlayer,
}) => {
  const { nickName, playerColor } = player;
  const [points, setPoints] = useState(0);
  const removePlayer = () => {
    deletePlayer(player);
  };
  return (
    <div
      style={{ backgroundColor: `var(--player${playerColor}Light)` }}
      className={styles.PlayerDisplayContainer}
      data-testId={`player-${player.playerColor.toLowerCase()}-display`}>
      <div
        className={classNames(styles.elementsWrapper, currentView === 'EDIT' && styles.editMode)}>
        <span className={styles.nickName}>{nickName}</span>
        {currentView === 'GAME' && (
          <div className={styles.counter}>
            <button
              data-testid={`minus-${player.playerColor.toLowerCase()}`}
              className={styles.minus}
              onClick={() => setPoints(points - 1)}>
              -
            </button>
            <span
              data-testid={`points-${player.playerColor.toLowerCase()}`}
              className={styles.currentPoints}>
              {points}
            </span>
            <button
              data-testid={`plus-${player.playerColor.toLowerCase()}`}
              className={styles.plus}
              onClick={() => setPoints(points + 1)}>
              +
            </button>
          </div>
        )}
        {currentView === 'EDIT' && (
          <button
            className={styles.deleteIcon}
            onClick={removePlayer}
            data-testid={`delete-player-${player.playerColor.toLowerCase()}-btn`}>
            <DeleteIcon />
          </button>
        )}
      </div>
    </div>
  );
};
