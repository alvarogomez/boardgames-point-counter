import React, { useState, useRef, useEffect } from 'react';

import styles from './AddPlayerForm.module.scss';
import { Player } from '../../App';
import classNames from 'classnames';

export type AddPlayerFormProps = {
  updatePlayerList: (Player: Player) => void;
  listOfColors: string[];
  getUnavailableColors: () => string[];
};

export const AddPlayerForm: React.FC<AddPlayerFormProps> = ({
  updatePlayerList,
  listOfColors,
  getUnavailableColors,
}) => {
  const [nickName, setNickName] = useState('');
  const [playerColor, setPlayerColor] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (nickName === '') focusOnInput();
  }, [nickName]);

  const saveForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    updatePlayerList({
      nickName,
      playerColor,
    });
  };

  const handleNicknameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNickName(event.currentTarget.value);
  };

  const handleColorChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setPlayerColor(event.currentTarget.value);
  };

  const focusOnInput = () => {
    inputRef?.current?.focus();
  };

  const unavailableColors = getUnavailableColors();
  return (
    <div className={styles.addPlayerFormContainer}>
      <div className={styles.playerNameInput}>
        <label className={styles.formLabel}>Please type the nickname:</label>
        <input
          data-testid="name-input"
          ref={inputRef}
          className={styles.textInput}
          type="text"
          value={nickName}
          onChange={handleNicknameChange}
        />
        {nickName && (
          <select
            className={styles.selectInput}
            data-testid="color-selector"
            name="playerColor"
            onChange={handleColorChange}>
            <option>...Please select a color</option>
            {listOfColors
              .filter((val) => !unavailableColors.includes(val))
              .map((color) => (
                <option key={color}>{color}</option>
              ))}
          </select>
        )}
      </div>
      {nickName && playerColor && (
        <button
          className={classNames(styles.primaryButton, styles.button)}
          data-testid="create-player-btn"
          onClick={saveForm}>
          Add new player
        </button>
      )}
    </div>
  );
};
