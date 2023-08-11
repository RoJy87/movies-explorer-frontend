import React from 'react';
import { classNames } from '../../utils/classNames';

export default function FilterCheckbox({ onHandleCheckShorts, isChecked }) {
  const handleCheck = () => {
    onHandleCheckShorts();
  };
  return (
    <label
      className={classNames('checkbox', { checked: isChecked })}
      htmlFor="short-film"
      onChange={handleCheck}>
      <input type="checkbox" name="short-film" id="short-film" className="checkbox__input" />{' '}
      Короткометражки
    </label>
  );
}
