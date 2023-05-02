import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
  phoneNumberValidator,
} from "../core/utils";
import { FlatList } from "react-native-gesture-handler";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
  const [width, setWidth] = useState(0);

  const signUpPressed = async () => {
    try {
      const usernameError = usernameValidator(username.value);
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
      const phoneNumberError = phoneNumberValidator(phoneNumber.value);

      if (usernameError || passwordError || emailError || phoneNumberError) {
        setUsername({ ...username, error: usernameError });
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
        return;
      }
      let user = {
        username: username.value,
        password: password.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
      };
      const response = await fetch("http://192.168.0.104:3000/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      alert("Register successfully");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      alert("Register failed");
      failedRegister();
    }
  };

  return (
    <Background>
      <Logo />
      <Header>Create Account</Header>
      <View style={{ flex: 8, flexDirection: "row" }}>
        <FlatList
          ListHeaderComponent={
            <View>
              <TextInput
                label="Username"
                returnKeyType="next"
                value={username.value}
                onChangeText={(text) => setUsername({ value: text, error: "" })}
                error={!!username.error}
                errorText={username.error}
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

              <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: "" })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />

              <TextInput
                label="Phone Number"
                returnKeyType="done"
                value={phoneNumber.value}
                onChangeText={(text) =>
                  setPhoneNumber({ value: text, error: "" })
                }
                error={!!phoneNumber.error}
                errorText={phoneNumber.error}
                secureTextEntry
              />
            </View>
          }
        />
      </View>
      <Button mode="contained" onPress={signUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    flex: 1,
    marginTop: 12,
    alignSelf: "center",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 30,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(Register);
