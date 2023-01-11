import React, {
  FC, ChangeEventHandler, FormEventHandler, useCallback, useState
} from 'react';

import { TBaseItemFormProps } from '../../types';

const BaseItemForm: FC<TBaseItemFormProps> = ({ url, initialName, initialCount }) => {
  const [name, setName] = useState<string>(initialName || '');
  const [count, setCount] = useState<number>(initialCount || 0);

  const changeName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setName(e.target.value),
    []
  );

  const changeCount = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setCount(parseInt(e.target.value)),
    []
  );

  const handle = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          count: count,
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
      });
    },
    [name, count, parentGroupId]
  );

  return (
    <form onSubmit={ handle }>
      <div>
        <label>
          Name
          <input
            type="text"
            placeholder="Name"
            onChange={ changeName }
            value={ name }
            name="name"
          />
        </label>
      </div>
      <div>
        <label>
          Count
          <input
            type="number"
            placeholder="Count"
            onChange={ changeCount }
            value={ count }
            name="count"
          />
        </label>
      </div>
      <input type="submit" />
    </form>
  );
}

export default BaseItemForm;
