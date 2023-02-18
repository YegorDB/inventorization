import React, {
  FC, ChangeEventHandler, FormEventHandler, useCallback, useState
} from 'react';

import ItemCount from '../item-count/ItemCount';
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

  const countCallback = useCallback(
    (newCount: number) => setCount(newCount),
    [setCount]
  );

  const neededCountCallback = useCallback(
    (newCount: number) => setNeededCount(newCount),
    [setNeededCount]
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
        <div>
          <label>Count</label>
        </div>
        <div>
          <ItemCount count={count} callback={countCallback} />
        </div>
      </div>

      <div>
        <div>
          <label>Needed count</label>
        </div>
        <div>
          <ItemCount count={neededCount} callback={neededCountCallback} />
        </div>
      </div>

      <input type="submit" />
    </form>
  );
}

export default BaseItemForm;
