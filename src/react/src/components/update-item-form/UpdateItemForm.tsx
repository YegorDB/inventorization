import React, { FC } from 'react';

import BaseItemForm from '../base-item-form/BaseItemForm';
import { TUpdateItemFormProps } from '../../types';

const UpdateItemForm: FC<TUpdateItemFormProps> = ({ itemId, initialName, initialCount }) => {
  const url = `/api/items/update/${itemId}/`;

  return (
    <BaseItemForm url={url} initialName={initialName} initialCount={initialCount} />
  );
}

export default UpdateItemForm;
