import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";
import "@aws-amplify/ui-react/styles.css";
import Comp from "./Comp";

Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_AWS_REGION,
    userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
    identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID,
  },
});
Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: import.meta.env.VITE_AWS_REGION,
    aws_pubsub_endpoint: import.meta.env.VITE_AWS_IOT_ENDPOINT,
  })
);

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator hideSignUp>
        {({ signOut, user }) => {
          // console.log(user);
          // console.log(user.signInUserSession.idToken.payload["cognito:groups"]);
          return (
            <div>
              <button onClick={signOut}>Sign out</button>
              <p>Username: {user?.username}</p>
              <Comp />
            </div>
          );
        }}
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
