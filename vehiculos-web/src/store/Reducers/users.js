// import users from "../../users.json";

// const reducer = (state = users, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };
// export default reducer;

// export const getAssignments = (state, userId) => {
//   // console.log(state.users);
//   // console.log(Number(userId));
//   return state.users.map(user => {
//     const assign = assignments.find(assign => {
//       return assign.assignUser === Number(userId);
//     });
//     // console.log(assign);
//     return {...user , assignUser: assign };
//   });
// };

// export const getAssignment = (state, userId) => {
//   const assignId = state.assignments.find(
//     assign => assign.assignUser === Number(userId)
//   );
//   if (assignId) {
//     const userAssign = state.users.find(
//       user => user.id === assignId.assignUser
//     );
//     return { userAssign };
//   } else {
//     return null;
//   }
// };
// export const getUserAssignment = (state, userId) =>
//   state.gangs.gangs.find(ga => ga._id === Number(userId));
