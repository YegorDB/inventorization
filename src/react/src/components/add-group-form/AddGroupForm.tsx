import React, {
  FC, ChangeEventHandler, FormEventHandler, useCallback, useState
} from 'react';

import { TAddGroupFormProps, TGroup } from '../../types';
import { createGroupRequest } from '../../utils';

const AddGroupForm: FC<TAddGroupFormProps> = ({ parentGroupId }) => {
  const [name, setName] = useState<string>('');

  const changeName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setName(e.target.value),
    []
  );

  const handle = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();

      const requestData = {
        name: name,
      };

      createGroupRequest(
        parentGroupId,
        requestData,
        (responseData: TGroup) => {
          console.log('responseData', responseData);
        }
      );
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
