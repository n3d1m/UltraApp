import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Vibration
} from "react-native";
import axios from "axios";

import Constants from "expo-constants";
import * as Speech from "expo-speech";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    axios
      .get("https://ultrasound-app.herokuapp.com/data")
      .then(res => {
        var dataObect = res.data;
        this.setState({ data: dataObect[0] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toSpeak = number => {
    word = "Object " + number.toString() + " meters away";
    Speech.speak(word, {
      voice: "com.apple.ttsbundle.Karen-compact"
    });
    Vibration.vibrate();
  };

  render() {
    {
      this.state.data == null ? null : this.toSpeak(this.state.data);
    }
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "100%",
          width: "100%",
          backgroundColor: "black"
        }}
      >
        <StatusBar barStyle="light-content" />
        <Text style={{ color: "white", fontSize: 36 }}>
          {this.state.data}
          {this.state.data == null ? "" : "m Away"}
        </Text>
      </View>
    );
  }
}
