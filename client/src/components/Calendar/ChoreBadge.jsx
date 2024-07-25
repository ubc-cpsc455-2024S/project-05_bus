import { Badge } from "@chakra-ui/react";
import moment from "moment";

const ChoreBadge = ({ chore }) => {
  const currentDate = moment();
  const choreDate = moment(chore.start);
  const daysDifference = choreDate.diff(currentDate, 'days');

  let colorScheme;
  if (daysDifference > 7) {
    colorScheme = "green";
  } else if (daysDifference > 3) {
    colorScheme = "yellow";
  } else {
    colorScheme = "red";
  }

  return (
    <Badge variant="solid" colorScheme={colorScheme}>
      {moment(chore.start).format("MMM Do")}
    </Badge>
  );
};

export default ChoreBadge;
