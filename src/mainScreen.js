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
import Video from "react-native-video";
import Constants from "expo-constants";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const viewabilityConfig = {
  itemVisiblePercentThreshold: 80,
  minimumViewTime: 100,
};

export default class mainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexToPlay: 0,
    };
  }

  _onViewableItemsChanged = async (props) => {
    const changed = props.changed;

    for (const item of changed) {
      if (item.isViewable && this.state.indexToPlay !== item.index) {
        this.setState({ indexToPlay: item.index });
      }
    }
  };

  renderRow = ({ item, index }) => {
    const { indexToPlay } = this.state;
    console.log(item);

    return (
      <View
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT - Constants.statusBarHeight,
        }}
      >
        <Video
          rate={1.0}
          muted={false}
          volume={0.5}
          source={
            index == 0 ? require("./video1.mp4") : require("./video2.mp4")
          }
          resizeMode="contain"
          paused={indexToPlay === index ? false : true}
          repeat={true}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT - Constants.statusBarHeight,
          }}
        />
        <View style={{ flex: 1, padding: 10, justifyContent: "flex-end" }}>
          <Button
            onPress={() => {
              this.props.navigation.navigate("test");
            }}
            title="Next Screen"
            color="#841584"
          />
        </View>
      </View>
    );
  };

  render() {

    return (
      <View style={styles.container}>
        <FlatList
          data={[0,1]}
          horizontal={false}
          initialScrollIndex={0}
          showsVerticalScrollIndicator={false}
          ref={(ref) => {
            this.list = ref;
          }}

          getItemLayout={(data, index) => ({
            length: SCREEN_HEIGHT - Constants.statusBarHeight,
            offset: (SCREEN_HEIGHT - Constants.statusBarHeight) * index,
            index,
          })}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          onViewableItemsChanged={this._onViewableItemsChanged}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          updateCellsBatchingPeriod={150}
          windowSize={5}
          viewabilityConfig={viewabilityConfig}
          removeClippedSubviews={false}
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
  },
});
