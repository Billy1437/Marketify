// // here we use for API request that need authentication

// import api from "../lib/axios";
// import {useAuth, useUser} from "@clerk/clerk-react";
// import { syncUser } from "../lib/api";
// import { useMutation } from "@tanstack/react-query";
// import { useEffect } from "react";

// // what this hook do
// // 1. Check if user is logged in with Clerk
// // 2. Get Clerk user info
// // 3. Call backend API to save that user
// // 4. Return whether syncing is finished

// function useUserSync() {
//   // first step, we use for get authentication info from clerk
//   const { isSignedIn } = useAuth();

//   const { user } = useUser();

//   // use mutation here
//   //what does use mutation do , => automatically trigger when something change => isSignedIn change
//   // => call api sync user =>

//   // so we got state,
//   const {
//     mutate: syncUserMutation,
//     isPending,
//     isSuccess,
//   } = useMutation({
//     mutationFn: syncUser,
//   });
// //   use mutation do -> when trigger => do something => get result
// // mutate mean : syncUserMutation(userData) => send req to server => and return result

//   //   there need useEffect to trigger the mutation

//   useEffect(() => {
//     // If user is signed in
//     // and user data exists
//     // and request is not currently running
//     // and sync has not succeeded yet
//     // then call syncUserMutation()

//     if (isSignedIn && user && !isPending && !isSuccess) {
//       syncUserMutation({
//         email: user.primaryEmailAddress.emailAddress,
//         name: user.fullName || user.firstName,
//         imageUrl: user.imageUrl,
//       });
//     }
//   }, [isSignedIn, user, syncUserMutation, isPending, isSuccess]);
//   return { isSynced: isSuccess };
// }

// export default useUserSync;

import { useAuth, useUser } from "@clerk/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/api";

// the best way to implement this is by using webhooks
function useUserSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const {
    mutate: syncUserMutation,
    isPending,
    isSuccess,
    isError,
  } = useMutation({ mutationFn: syncUser });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess && !isError) {
      syncUserMutation({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, user, syncUserMutation, isPending, isSuccess, isError]);

  return { isSynced: isSuccess };
}

export default useUserSync;