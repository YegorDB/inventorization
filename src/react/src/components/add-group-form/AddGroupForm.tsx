import React, {
  FC, ChangeEventHandler, FormEventHandler, useCallback, useState
} from 'react';

import { TAddGroupFormProps } from '../../types';

const AddGroupForm: FC<TAddGroupFormProps> = ({ parentGroupId }) => {
  const [name, setName] = useState<string>('');

  const changeName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setName(e.target.value),
    []
  );

  const handle = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();

      fetch(`/api/groups/add/${parentGroupId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
      });
    },
    [name, parentGroupId]
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
      <input type="submit" />
    </form>
  );
}

export default AddGroupForm;
