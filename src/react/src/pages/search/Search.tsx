import React, { FC, useCallback, useState, ChangeEventHandler } from 'react';
import { redirect } from 'react-router-dom';

import ParentGroups from '../../components/parent-groups/ParentGroups';
import { SearchType } from '../../enums';
import { TSearchTypeItemProps, TSearchResults } from '../../types';
import { request, checkAuth } from '../../utils';

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
  const [searchType, setSearchType] = useState<keyof typeof SearchType>(SearchType.items);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<TSearchResults>([]);

  const changeSearchTypeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setSearchType(e.target.value as keyof typeof SearchType),
    []
  );

  const changeSearchQueryHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => {
      setSearchQuery(e.target.value);
      request<TSearchResults>(
        `/api/search/${searchType}/?s=${searchQuery}`,
        undefined,
        (results: TSearchResults) => {
          console.log('search results', results);
          setSearchResults(results);
        }
      );
    },
    [searchQuery, searchType]
  );

  return (
    <>
      <ParentGroups />

      <h1>Search</h1>

      <div>
        <SearchTypeTab
          labelText="Items"
          value={ SearchType.items }
          activeValue={ searchType }
          changeHandler={ changeSearchTypeHandler }
        />

        <SearchTypeTab
          labelText="Groups"
          value={ SearchType.groups }
          activeValue={ searchType }
          changeHandler={ changeSearchTypeHandler }
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Search query"
          onChange={ changeSearchQueryHandler }
          value={ searchQuery }
          name="search-query"
        />
      </div>
    </>
  );
}

export default SearchPage;
