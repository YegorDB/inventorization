import React, {
  FC, ChangeEventHandler, FormEventHandler, useCallback, useState
} from 'react';

import { TAddItemFormProps } from '../../types';

export const AddItemForm: FC<TAddItemFormProps> = ({ parentGroupId }) => {
  const [name, setName] = useState<string>('');
  const [count, setCount] = useState<number>(0);

  const changeName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setName(e.target.value),
    []
  );

  const changeCount = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setCount(e.target.value),
    []
  );

  const handle = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();

      fetch(`/api/items/add/${parentGroupId}/`, {
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
    [name]
  );

  return (
    <form onSubmit={ handle }>
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
      <input type="submit" />
    </form>
  );
}

export default AddItemForm;
