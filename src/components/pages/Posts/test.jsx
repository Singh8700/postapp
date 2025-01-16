// import React, { useEffect, useState } from 'react';
// import jwt_decode from 'jwt-decode';  // Importing the jwt-decode package

// const TestPost = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Get the token from localStorage or sessionStorage
//     const token = sessionStorage.getItem('jwtToken');  // Replace with your actual key

//     if (token) {
//       // Remove 'Bearer ' prefix if present
//       const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

//       // Decode the token to get the payload
//       const decodedData = jwt_decode(tokenWithoutBearer);
      
//       // Set the decoded data in state
//       setUser(decodedData);
//       console.log(decodedData); // This will print the decoded payload
//     } else {
//       console.log('No token found');
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Create a Post</h1>
//       {user ? (
//         <div>
//           <p>Welcome, {user.email}!</p>
//         </div>
//       ) : (
//         <p>Please log in to create a post.</p>
//       )}
//     </div>
//   );
// };

// export default TestPost;
