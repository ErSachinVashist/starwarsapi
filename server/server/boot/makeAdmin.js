// // Grant Admin access to user
//
// let email='s@v';
// module.exports = function(app) {
//   let Users = app.models.Users;
//   let Role = app.models.Role;
//   let RoleMapping = app.models.RoleMapping;
//
//     Users.findOne({where:{email:email}}, function(err, user) {
//     if (err) throw err;
//
//     console.log('user:', user.firstName);
//
//     Role.create({
//       name: 'admin'
//     }, function(err, role) {
//       if (err) throw err;
//
//       console.log('Created role:', role);
//       role.principals.create({
//         principalType: RoleMapping.USER,
//         principalId: user.userId
//       }, function(err, principal) {
//         if (err) throw err;
//         console.log('Created principal:', principal);
//       });
//     });
//   });
// };
//
