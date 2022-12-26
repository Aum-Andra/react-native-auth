import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
import { Alert, StyleSheet } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Colors } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <LinearGradient
      colors={[Colors.linear1, Colors.linear2]}
      style={styles.linearGradient}
    >
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </LinearGradient>
  );
}

export default LoginScreen;

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
