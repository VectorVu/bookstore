import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import TextInput from "../components/TextInput";
import { COLORS} from "../constants";
import { useState } from "react";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL_IP from "../constants/connect";

const Settings = ({navigation}) => {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  let addedPoints = 0;

  const accountSettingPressed = async () => {
    const userInfo = JSON.parse(await AsyncStorage.getItem("savedUser"));
    console.log(userInfo);
    setUsername({ value: userInfo.username, error: "" });
    setEmail({ value: userInfo.email, error: "" });
    setPassword({ value: userInfo.password, error: "" });
    setPhoneNumber({ value: userInfo.phoneNumber, error: "" });
    setModalVisible(true);
  }

  const updatePressed = async () => {
    const userInfo = JSON.parse(await AsyncStorage.getItem("savedUser"));
    let user = {
      username: username.value,
      password: password.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      point: userInfo.point,
      savedBooks: userInfo.savedBooks,
    };
    const response = await fetch(`${URL_IP}/user/${userInfo.username}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await response.json();
    console.log(res.message);
    if(res.message === "Update successfully") {
      alert("Update successfully\nPlease login again");
      setModalVisible(false);
      await AsyncStorage.removeItem("savedUser");
      navigation.replace("Login");
    } else {
      alert("Update failed");
      setModalVisible(false);
    }
  }

  const loggedOutPressed =() => {
    setModalVisible1(true);
  }
  const loggedOutYesPressed = async () => {
    await AsyncStorage.removeItem("savedUser");
    setModalVisible1(false);
    navigation.replace("Login");
  }

  const getPointsPressed = () => {
    setModalVisible2(true);
  }

  const updatePointsPressed = async () => {
    console.log(addedPoints);
    const userInfo = JSON.parse(await AsyncStorage.getItem("savedUser"));
    const newPoints = userInfo.point + addedPoints;
    let user = {
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      point: newPoints,
      savedBooks: userInfo.savedBooks,
    };
    const response = await fetch(`${URL_IP}/user/${userInfo.username}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await response.json();
    console.log(res.message);
    if(res.message === "Update successfully") {
      alert("Successfully");
      setModalVisible2(false);
      await AsyncStorage.setItem("savedUser", JSON.stringify(user));
      navigation.navigate("home");
    } else {
      alert("Update failed");
      setModalVisible2(false);
    }
  }

  const renderAccountSetting = () => {
    return(
      <Dialog
        visible={modalVisible}
        onTouchOutside={() => {
          setModalVisible(false);
        }}
        width={300}
        height={500}
      >
        <DialogContent>
          <View style={{ marginTop: 20 }}>
            <View  style={{alignItems: 'center',}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>USER INFORMATION</Text>
            </View>
            <FlatList
              ListHeaderComponent={
                <View>
                  <TextInput
                    label="Username"
                    returnKeyType="next"
                    value={username.value}
                    onChangeText={(text) =>
                      setUsername({ value: text, error: "" })
                    }
                    error={!!username.error}
                    errorText={username.error}
                  />

                  <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) =>
                      setPassword({ value: text, error: "" })
                    }
                    error={!!password.error}
                    errorText={password.error}
                    // secureTextEntry
                  />

                  <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) =>
                      setEmail({ value: text, error: "" })
                    }
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
                    // secureTextEntry
                  />
                </View>
              }
            />
          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={updatePressed}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose, {backgroundColor: 'gray'}]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </DialogContent>
      </Dialog>
    )
  }

  const renderLoggedOut = () => {
    return(
      <Dialog
        visible={modalVisible1}
        onTouchOutside={() => {
          setModalVisible1(false);
        }}
        width={250}
        height={200}
      >
        <DialogContent>
          <Text style={styles.text}>Are you sure to log out</Text>
        <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible1(false)}
      >
        <Text style={styles.buttonText}>NO</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen, {backgroundColor: 'gray', marginVertical: 12}]}
        onPress={loggedOutYesPressed}
      >
        <Text style={styles.buttonText}>YES</Text>
      </TouchableOpacity>
        </DialogContent>
      </Dialog>
    )
  }

  const renderGetPoints = () => {
    return(
      <Dialog
        visible={modalVisible2}
        onTouchOutside={() => {
          setModalVisible2(false);
        }}
        width={250}
        height={300}
      >
        <DialogContent>
        <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={()=>{
          addedPoints = 10;
          updatePointsPressed();
        }}
      >
        <Text style={styles.buttonText}>10 Points = 10$</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={()=>{
          addedPoints = 60;
          updatePointsPressed();
        }}
      >
        <Text style={styles.buttonText}>60 Points = 50$</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={()=>{
          addedPoints = 150;
          updatePointsPressed();
        }}
      >
        <Text style={styles.buttonText}>150 Points = 100$</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={()=>{
          addedPoints = 400;
          updatePointsPressed();
        }}
      >
        <Text style={styles.buttonText}>400 Points = 200$</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen, {backgroundColor: 'gray'}]}
        onPress={() => setModalVisible2(false)}
      >
        <Text style={styles.buttonText}>CLOSE</Text>
      </TouchableOpacity>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={accountSettingPressed}
      >
        <Text style={styles.buttonText}>Account Setting</Text>
      </TouchableOpacity>
      {renderAccountSetting()}
      <TouchableOpacity
        style={styles.button}
        onPress={getPointsPressed}
      >
        <Text style={styles.buttonText}>Get Points</Text>
      </TouchableOpacity>
      {renderGetPoints()}
      <TouchableOpacity
        style={styles.button}
        onPress={loggedOutPressed}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      {renderLoggedOut()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

});

export default Settings;

