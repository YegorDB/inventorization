import React, {
  ChangeEventHandler, MouseEventHandler, FC, useCallback
} from 'react';

import { TItemCountProps } from '../../types';

import styles from './ItemCount.module.css';

const ItemCount: FC<TItemCountProps> = ({ count, callback }) => {
  const onClickMinus = useCallback<MouseEventHandler<HTMLButtonElement>>(
    e => callback(count - 1),
    [count, callback]
  );

  const onClickPlus = useCallback<MouseEventHandler<HTMLButtonElement>>(
    e => callback(count + 1),
    [count, callback]
  );

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => callback(parseInt(e.target.value)),
    [callback]
  );

  return (
    <div className={ styles.ItemCount }>
      <button
        type="button"
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
        type="button"
        onClick={ onClickPlus }
        className={ styles.ItemCountButton }
      >+</button>
    </div>
  );
}

export default ItemCount;
