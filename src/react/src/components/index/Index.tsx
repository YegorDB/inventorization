import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Group = {
  _id: string,
  name: string,
}

function Index() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch('/api/groups/')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setGroups(data);
    });
  }, []);

  return (
    <div>
      Groups:
      {groups.length > 0 && groups.map((group: Group) => (
        <Link to={`group/${group._id}`} key={group._id}>
          <div>{group.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default Index;
