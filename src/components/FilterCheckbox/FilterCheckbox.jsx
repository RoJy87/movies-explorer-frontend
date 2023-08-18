import React from 'react';
import { classNames } from '../../utils/classNames';

export default function FilterCheckbox({ onHandleCheckShorts, isChecked }) {
  return (
    <label className={classNames('checkbox', { checked: isChecked })} htmlFor="short-film">
      <input
        type="checkbox"
        name="short-film"
        id="short-film"
        className="checkbox__input"
        onChange={onHandleCheckShorts}
        checked={isChecked || false}
      />{' '}
      Короткометражки
    </label>
  );
}
