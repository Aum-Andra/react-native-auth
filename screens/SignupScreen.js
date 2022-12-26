import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
import { Alert, StyleSheet } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Colors } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <LinearGradient
      colors={[Colors.linear1, Colors.linear2]}
      style={styles.linearGradient}
    >
      <AuthContent onAuthenticate={signupHandler} />
    </LinearGradient>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    justifyContent: "center",

    flex: 1,
  },
  authContent: {
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    marginTop: 160,
  },
  buttons: {
    marginTop: 8,
  },
});
