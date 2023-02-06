import React, { FC } from 'react';

import BaseItemForm from '../base-item-form/BaseItemForm';
import { TUpdateItemFormProps } from '../../types';

const UpdateItemForm: FC<TUpdateItemFormProps> = ({
  itemId,
  initialName,
  initialCount,
  initialNeededCount
}) => {
  const path = `/api/items/update/${itemId}/`;

  return (
    <BaseItemForm
      path={path}
      initialName={initialName}
      initialCount={initialCount}
      initialNeededCount={initialNeededCount}
    />
  );
}

export default UpdateItemForm;
