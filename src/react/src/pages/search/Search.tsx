import React, {
  FC, useCallback, useState, ChangeEventHandler, FormEventHandler
} from 'react';
import { Link, redirect } from 'react-router-dom';

import ParentGroups from '../../components/parent-groups/ParentGroups';
import { SearchType } from '../../enums';
import {
  TSearchTypeItemProps,
  TSearchResults,
  TItemSearchResultProps,
  TGroupSearchResultProps,
  TFullItem,
  TFullGroup,
} from '../../types';
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

const ItemSearchResult: FC<TItemSearchResultProps> = ({ item }) => {
  return (
    <>
      <h4>Item</h4>
      <div>
        <Link to={`/item/${item.id}`}>
          <div>{item.name}</div>
        </Link>
      </div>
      <h4>Group from</h4>
      <div>
        <Link to={`/group/${item.group.id}`}>
          <div>{item.group.name}</div>
        </Link>
      </div>
    </>
  );
}

const GroupSearchResult: FC<TGroupSearchResultProps> = ({ group }) => {
  return (
    <>
      <h4>Group</h4>
      <div>
        <Link to={`/group/${group.id}`}>
          <div>{group.name}</div>
        </Link>
      </div>
      <h4>Group from</h4>
      <div>
        {group.group ? (
          <Link to={`/group/${group.group.id}`}>
            <div>{group.group.name}</div>
          </Link>
        ) : <div>Empty</div>}
      </div>
    </>
  );
}

function SearchPage() {
  const [searchType, setSearchType] = useState<keyof typeof SearchType>(SearchType.items);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<TSearchResults>([]);

  const changeSearchTypeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => {
      setSearchResults([]);
      setSearchType(e.target.value as keyof typeof SearchType);
    },
    []
  );

  const changeSearchQueryHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setSearchQuery(e.target.value),
    []
  );

  const searchHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();

      request<TSearchResults>(
        `/api/1.0/${searchType}/?query=${searchQuery}`,
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

      <form onSubmit={ searchHandler }>
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

        <div>
          <input type="submit" value="Search" />
        </div>
      </form>

      <div>
        {searchType === SearchType.items ? (
          searchResults.map((item: TFullItem | TFullGroup) => (
            <ItemSearchResult item={ item as TFullItem } key={ item.id } />
          ))
        ) : (
          searchResults.map((group: TFullItem | TFullGroup) => (
            <GroupSearchResult group={ group as TFullGroup }  key={ group.id } />
          ))
        )}
      </div>
    </>
  );
}

export default SearchPage;
