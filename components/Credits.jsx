import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Credits = ({ pays, courts, spents, gains }) => {
  const parseMil = (num) => {
    return parseInt(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <View style={styles.contentSeach}>
      <View style={styles.texts}>
        <Text style={styles.text}>Cortes: {parseMil(courts)}</Text>
        <Text style={styles.text}>Gastos: {parseMil(spents)}</Text>
      </View>

      <View style={styles.texts}>
        <Text style={styles.text}>Pagos: {parseMil(pays)}</Text>
        <Text style={styles.text}>Ganacia: {parseMil(gains)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentSeach: {
    padding: 5,
    position: "absolute",
    zIndex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000c7",
  },
  text: {
    color: "#fff",
  },
  texts: {
    padding: 2,
    width: "50%",
  },
});

export default Credits;
