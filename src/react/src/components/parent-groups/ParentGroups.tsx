import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { TParentGroupsProps } from '../../types';

const ParentGroups: FC<TParentGroupsProps> = ({ groups }) => {
  return (
    <>
      <Link to="/">
        <div>Main</div>
      </Link>
      {groups.map(group => (
        <Link to={`/group/${group._id}`} key={`/group/${group._id}`}>
          <div>{group.name}</div>
        </Link>
      ))}
    </>
  );
}

export default ParentGroups;
