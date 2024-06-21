import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function HomeGroup({ group }) {
  const memberIDs = group ? new Set(group.memberIDs) : null;
  const members = useSelector(state => state.users.users.filter(user => memberIDs.has(user.id)));

  return (
    <div>
      <Card>
        <CardHeader>
          <h1>{group ? group.name : "No active group"}</h1>
        </CardHeader>
        {group &&
          <CardBody>
            <ul>
              {members.map(member => (
                <div key={member.id}>
                  <p>{member.name}</p>
                </div>
              ))}
            </ul>
          </CardBody>
        }
      </Card>
    </div>
  )
}