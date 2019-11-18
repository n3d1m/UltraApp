import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:5000`;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "nothing" };
  }

  componentDidMount() {
    axios
      .get("https://ultrasound-app.herokuapp.com/getmsg/?name=Mark")
      .then(res => {
        //const data = res.about;
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //   componentDidMount() {
  //     return fetch("https://127.0.0.1:5000/0/")
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         console.log(responseJson);
  //         // this.setState(
  //         //   {
  //         //     isLoading: false,
  //         //     dataSource: responseJson.movies
  //         //   },
  //         //   function() {}
  //         // );
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }

  render() {
    // console.log(uri);
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Hello World</Text>
      </View>
    );
  }
}
