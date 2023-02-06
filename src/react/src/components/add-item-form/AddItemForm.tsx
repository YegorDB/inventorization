import React, { FC } from 'react';

import BaseItemForm from '../base-item-form/BaseItemForm';
import { TAddItemFormProps } from '../../types';

const AddItemForm: FC<TAddItemFormProps> = ({ parentGroupId }) => {
  const path = `/api/items/add/${parentGroupId}/`;

  return (
    <BaseItemForm path={path} />
  );
}

export default AddItemForm;
