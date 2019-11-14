export const handleChangeSingleAssign = value => ({
    type: "SELECT_ASSIGNMENT_USER",
    value
  });
  
  export const handleChangeSingleStore = value => ({
    type: "SELECT_ASSIGNMENT_STORE",
    value
  });

  export const searchVehicleOnFieldChange = (field, value) => ({
    type: "SEARCH_VEHICLE_CHANGE_FIELD",
    field,
    value 
  });

  

  //   export const searchVehicleOnFieldChange = (field, value) => {
  //   console.log(value);
  //   return {
  //     type: "SEARCH_VEHICLE_CHANGE_FIELD",
  //     field,
  //     value: new Date(value)
  //     //value : console.log(new Date(value).toLocaleDateString())
  //   };
  // };
  