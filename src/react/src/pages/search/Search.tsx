import React, { FC, useCallback, useState, ChangeEventHandler } from 'react';
import { redirect } from 'react-router-dom';

import ParentGroups from '../../components/parent-groups/ParentGroups';
import { TSearchTypeItemProps } from '../../types';
import { checkAuth } from '../../utils';

// @ts-ignore
export async function searchLoader({ params }) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  return null;
}

const SearchTypeTab: FC<TSearchTypeItemProps> = ({
  labelText,
  value,
  activeValue,
  changeHandler
}) => {
  const name = 'search-type';
  const id = `${name}-${value}`;

  return (
    <div>
      <input
        type="radio"
        value={ value }
        id={ id }
        name={ name }
        onChange={ changeHandler }
        checked={ value === activeValue }
      />
      <label htmlFor={ id } >{ labelText }</label>
    </div>
  );
}

function SearchPage() {
  const [searchType, setSearchType] = useState('items');
  const changeSearchTypeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setSearchType(e.target.value),
    []
  );

  return (
    <>
      <ParentGroups />

      <h1>Search</h1>

      <div>
        <SearchTypeTab
          labelText="Items"
          value="items"
          activeValue={ searchType }
          changeHandler={ changeSearchTypeHandler }
        />

        <SearchTypeTab
          labelText="Groups"
          value="groups"
          activeValue={ searchType }
          changeHandler={ changeSearchTypeHandler }
        />
      </div>
    </>
  );
}

export default SearchPage;
