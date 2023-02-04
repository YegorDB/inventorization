import React, {
  ChangeEventHandler, MouseEventHandler, FC, useCallback
} from 'react';

import { TItemCountProps } from '../../types';

import styles from './ItemCount.module.css';

const ItemCount: FC<TItemCountProps> = ({ count, setCount }) => {
  const onClickMinus = useCallback<MouseEventHandler<HTMLButtonElement>>(
    e => setCount(count - 1),
    [count, setCount]
  );

  const onClickPlus = useCallback<MouseEventHandler<HTMLButtonElement>>(
    e => setCount(count + 1),
    [count, setCount]
  );

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setCount(parseInt(e.target.value)),
    [setCount]
  );

  return (
    <div className={ styles.ItemCount }>
      <button
        onClick={ onClickMinus }
        className={ styles.ItemCountButton }
      >-</button>

      <input
        type="number"
        placeholder="Count"
        onChange={ onChange }
        value={ count }
        name="count"
      />

      <button
        onClick={ onClickPlus }
        className={ styles.ItemCountButton }
      >+</button>
    </div>
  );
}

export default ItemCount;
