import React, { FC } from 'react';

import BaseItemForm from '../base-item-form/BaseItemForm';
import { TAddItemFormProps } from '../../types';

const AddItemForm: FC<TAddItemFormProps> = ({ parentGroupId }) => {
  return (
    <BaseItemForm parentGroupId={parentGroupId} />
  );
}

export default AddItemForm;
