import React from "react";
import { withSwapiService } from "../../hoc-helper";

import ItemDetails, { Record } from "../item-details/item-details";

const PersonDetails = (props) => {
  console.log(props);
  return (
    <ItemDetails {...props}>
      <Record field="gender" label="Gender" />
      <Record field="eyeColor" label="Eye Color" />
    </ItemDetails>
  );
};
const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPerson,
    getImageUrl: swapiService.getPersonImage,
  };
};

export default withSwapiService(mapMethodsToProps)(PersonDetails);
