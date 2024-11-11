import { getDatabase, ref, onValue } from "firebase/database";

const getLastSeen = (uid) => {
  console.log(uid);
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    const statusRef = ref(database, "status/" + uid);

    onValue(
      statusRef,
      (snapshot) => {
        const usersData = snapshot.val();
        resolve(usersData);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export default getLastSeen;

export { getLastSeen };

// import { getDatabase, ref, onValue, off } from "firebase/database";

// const getLastSeen = (uid) => {
//   console.log(uid);
//   return new Promise((resolve, reject) => {
//     const database = getDatabase();
//     const statusRef = ref(database, "status/" + uid);

//     const listener = onValue(
//       statusRef,
//       (snapshot) => {
//         const usersData = snapshot.val();
//         console.log(usersData);
//         resolve(usersData);
//         off(statusRef, listener); // Detach listener after resolving
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// };

// export default getLastSeen;
// export { getLastSeen };
