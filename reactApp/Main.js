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
import * as FileSystem from "expo-file-system";
//import dataFile from "../data.json";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { dataLeft: null, dataRight: null, dataCenter: null };
  }

  componentDidMount() {
    //this.loadData();
    this.getData();
    setInterval(this.getData, 5000);
    //console.log(dataFile[0]);
    // test = Expo.FileSystem.readAsStringAsync("file://../Python/Output.txt");
    // console.log(test);
  }

  getData = () => {
    axios
      .get("http://9bdd8092.ngrok.io/data/")
      .then(res => {
        var dataObect = res.data;
        //console.log(dataObect);
        this.setState({
          dataLeft: dataObect["left"].toString(),
          dataRight: dataObect["right"].toString(),
          dataCenter: dataObect["center"]
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  toSpeak = (strL, strR, strC) => {
    numLeft = parseFloat(strL) / 100;
    numRight = parseFloat(strR) / 100;
    numCen = parseFloat(strC) / 100;

    //console.log(numLeft, numRight);

    if (numCen > 0) {
      var word =
        "Object " + numCen.toString() + " meters away directly in front of you";
      Speech.speak(word, {
        voice: "com.apple.ttsbundle.Karen-compact"
      });
      Vibration.vibrate();
    } else {
      if (numLeft > 0) {
        var word = "Object " + numLeft.toString() + " meters away to your left";
        Speech.speak(word, {
          voice: "com.apple.ttsbundle.Karen-compact"
        });
      }

      if (numRight > 0) {
        var word =
          "Object " + numRight.toString() + " meters away to your right";
        Speech.speak(word, {
          voice: "com.apple.ttsbundle.Karen-compact"
        });
      }

      Vibration.vibrate();
    }

    // word = "Object " + number.toString() + " meters away";
    // Speech.speak(word, {
    //   voice: "com.apple.ttsbundle.Karen-compact"
    // });
    // Vibration.vibrate();
  };

  render() {
    //this.loadData();
    //console.log(this.state.dataLeft, this.state.dataRight);

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          //flex: 1,
          height: "100%",
          width: "100%",
          backgroundColor: "black"
        }}
      >
        <StatusBar barStyle="light-content" />

        {this.state.dataLeft &&
        this.state.dataRight == null &&
        this.state.dataCenter == null
          ? null
          : this.toSpeak(
              this.state.dataLeft,
              this.state.dataRight,
              this.state.dataCenter
            )}

        {/* <Text style={{ color: "white", fontSize: 36 }}>
          {this.state.data == null ? "" : this.state.data + "m away"}
        </Text> */}
      </View>
    );
  }
}
