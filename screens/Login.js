import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { usernameValidator, passwordValidator } from "../core/utils";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [user, setUser] = useState(null);

  const loginPressed = async () => {
    const usernameError = usernameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    let userCheck = {
      username: username.value,
      password: password.value,
    };
    const response = await fetch("http://192.168.0.104:3000/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCheck),
    });
    const user = await response.json();
    //console.log(user);
    if (
      user.message !== "User not found" &&
      user.message !== "Wrong password"
    ) {
      alert("Login successfully");
      setUser(user);
      await AsyncStorage.setItem("savedUser", JSON.stringify(user));
      navigation.navigate("home");
    } else {
      alert(user.message);
    }
  };

  return (
    <Background>
      <Logo />

      <Header>Welcome to WeRead</Header>

      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={loginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
            setUsername({ ...username, error: '' });
            setPassword({ ...password, error: '' });
          }}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(Login);
