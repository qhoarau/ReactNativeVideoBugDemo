import { StatusBar } from "expo-status-bar";
import React from "react";

import mainScreen from "./src/mainScreen";
import screenTest from "./src/screenTest";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";

const mainStack = createStackNavigator({
  main: {
    screen: mainScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  test: {
    screen: screenTest,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const Tabs = createAppContainer(mainStack);
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Tabs />;
  }
}
