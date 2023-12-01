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
  const [points, setPoints] = useState(0);
  const { nickName } = player;
  const playerColor = player.playerColor;

  const removePlayer = () => {
    deletePlayer(player);
  };
  return (
    <div
      data-testId={`player-${playerColor}-display`}
      className={styles.PlayerDisplayContainer}
      style={{ backgroundColor: `var(--player${playerColor}Light)` }}>
      <div
        className={classNames(styles.elementsWrapper, currentView === 'EDIT' && styles.editMode)}>
        <span className={styles.nickName}>{nickName}</span>
        {currentView === 'GAME' && (
          <div className={classNames(styles.counter, styles.counterElement)}>
            <button
              data-testid={`minus-${playerColor}`}
              className={styles.minus}
              onClick={() => setPoints(points - 1)}>
              -
            </button>
            <span
              data-testid={`points-${playerColor}`}
              className={classNames(styles.currentPoints, styles.counterElement)}>
              {points}
            </span>
            <button
              data-testid={`plus-${playerColor}`}
              className={classNames(styles.plus, styles.counterElement)}
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
