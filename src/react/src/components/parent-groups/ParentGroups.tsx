import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { TParentGroupsProps } from '../../types';

const ParentGroups: FC<TParentGroupsProps> = ({ groups }) => {
  return (
    <>
      <Link to="/">
        <div>Main</div>
      </Link>
      {groups && groups.map(group => (
        <Link to={`/group/${group.id}`} key={group.id}>
          <div>{group.name}</div>
        </Link>
      ))}
    </>
  );
}

export default ParentGroups;
