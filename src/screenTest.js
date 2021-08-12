import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";


export default class screenTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { posts } = this.state;
    if (posts === null) {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.container}>
        <View style={{ margin: 10 }}>
          <Text>Screen test </Text>
        </View>

        <Button
          onPress={() => {
            this.props.navigation.goBack();
          }}
          title="Back"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    margin: 8,
  },
});
