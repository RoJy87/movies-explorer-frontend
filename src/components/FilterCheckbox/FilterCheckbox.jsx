import React, { useState } from 'react';
import { classNames } from '../../utils/classNames';

export default function FilterCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <label
      className={classNames('checkbox', { checked: checked })}
      htmlFor="short-film"
      onChange={() => setChecked(!checked)}
    >
      <input type="checkbox" name="short-film" id="short-film" className="checkbox__input" />{' '}
      Короткометражки
    </label>
  );
}
