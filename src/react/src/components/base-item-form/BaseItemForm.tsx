import React, {
  FC, ChangeEventHandler, FormEventHandler, useCallback, useState
} from 'react';

import { TBaseItemFormProps, TItem } from '../../types';
import { postRequest } from '../../utils';

const BaseItemForm: FC<TBaseItemFormProps> = ({
  path,
  initialName,
  initialCount,
  initialNeededCount
}) => {
  const [name, setName] = useState<string>(initialName || '');
  const [count, setCount] = useState<number>(initialCount || 0);
  const [neededCount, setNeededCount] = useState<number>(initialNeededCount || 0);

  const changeName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setName(e.target.value),
    []
  );

  const changeCount = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setCount(parseInt(e.target.value)),
    []
  );

  const changeNeededCount = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setNeededCount(parseInt(e.target.value)),
    []
  );

  const handle = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();

      const requestData = {
        name: name,
        count: count,
        neededCount: neededCount,
      };
      postRequest(path, requestData, (responseData: TItem) => {
        console.log('responseData', responseData);
      });
    },
    [name, count, neededCount, path]
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
      <div>
        <label>
          Needed count
          <input
            type="number"
            placeholder="Needed count"
            onChange={ changeNeededCount }
            value={ neededCount }
            name="neededCount"
          />
        </label>
      </div>
      <input type="submit" />
    </form>
  );
}

export default BaseItemForm;
