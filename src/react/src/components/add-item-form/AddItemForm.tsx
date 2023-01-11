import React, { FC } from 'react';

import BaseItemForm from '../base-item-form';
import { TAddItemFormProps } from '../../types';

const AddItemForm: FC<TAddItemFormProps> = ({ parentGroupId }) => {
  const url = `/api/items/add/${parentGroupId}/`;

  return (
    <BaseItemForm url={url} />
  );
}

export default AddItemForm;
