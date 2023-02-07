import React, {
  FC, ChangeEventHandler, FormEventHandler, useCallback, useState
} from 'react';

import { TAddGroupFormProps, TGroup } from '../../types';
import { postRequest } from '../../utils';

const AddGroupForm: FC<TAddGroupFormProps> = ({ parentGroupId }) => {
  const [name, setName] = useState<string>('');

  const changeName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setName(e.target.value),
    []
  );

  const handle = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();

      const url = `/api/groups/add/${parentGroupId}/`;
      const requestData = {
        name: name,
      };
      postRequest(url, requestData, (responseData: TGroup) => {
        console.log('responseData', responseData);
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
