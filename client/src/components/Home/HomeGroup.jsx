// import './Home.css';
// import { Box, Card, CardHeader, CardBody, CardFooter, Avatar, Button} from '@chakra-ui/react';
// import { useSelector } from 'react-redux';

// export default function HomeGroup({ group }) {
//   const memberIDs = group ? new Set(group.memberIDs) : null;
//   const members = useSelector(state => state.users.users.filter(user => memberIDs.has(user.id)));

//   return (
//     <Box className="home-card-container">
//       <Card>
//         <CardHeader className="home-card-header">
//           <h1 className="home-heading">{group ? group.name : "No active group"}</h1>
//           <span className="material-symbols-outlined icon">house</span>
//         </CardHeader>
//         <CardBody className="home-card-body">
//             <ul>
//               {members.map(member => (
//                 <div key={member.id} className="group-member-container">
//                   <Avatar className="group-member-avatar" size="sm" />
//                   <p>{member.name}</p>
//                 </div>
//               ))}
//             </ul>
//           </CardBody>
//           <CardFooter className="home-card-footer">
//             <Button className="settings-button">
//               <span className="material-symbols-outlined settings-icon">settings</span>
//             </Button>
//           </CardFooter>
//       </Card>
//     </Box>
//   )
// }

import './Home.css';
import { Box, Card, CardHeader, CardBody, CardFooter, Avatar, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function HomeGroup({ group }) {
  const memberIDs = group ? new Set(group.memberIDs) : null;
  const members = useSelector(state => state.users.users.filter(user => memberIDs.has(user.id)));

  return (
    <Box className="home-card-container">
      <Card className="home-card">
        <CardHeader className="home-card-header">
          <h1 className="home-heading">{group ? group.name : "No active group"}</h1>
          <span className="material-symbols-outlined icon">house</span>
        </CardHeader>
        <CardBody className="home-card-body">
          <ul>
            {members.map(member => (
              <div key={member.id} className="group-member-container">
                <Avatar className="group-member-avatar" size="sm" />
                <p>{member.name}</p>
              </div>
            ))}
          </ul>
        </CardBody>
        <CardFooter className="home-card-footer">
          <Button className="settings-button">
            <span className="material-symbols-outlined settings-icon">settings</span>
          </Button>
        </CardFooter>
      </Card>
    </Box>
  )
}
