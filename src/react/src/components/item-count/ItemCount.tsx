import React, { FC, useCallback } from 'react';

import { TItemCountProps } from '../../types';

const ItemCount: FC<TItemCountProps> = ({ count, setCount }) => {
  const onClickMinus = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setCount(count - 1),
    [count, setCount]
  );

  const onClickPlus = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setCount(count + 1),
    [count, setCount]
  );

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setCount(parseInt(e.target.value)),
    [setCount]
  );

  return (
    <div>
      <div>
        <button onClick={ onClickMinus }>-</button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Count"
          onChange={ onChange }
          value={ initialCount }
          name="count"
        />
      </div>
      <div>
        <button onClick={ onClickPlus }>+</button>
      </div>
    </div>
  );
}

export default ItemCount;
