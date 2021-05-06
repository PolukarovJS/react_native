import React from "react";
import { StyleSheet, Button, View } from "react-native";

export const AppCard = (props) => {
   return <View style={{ ...styles.default, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
   default: {
      padding: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 10,
      // Тени для iOS
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 2,
      shadowOffset: { width: 2, height: 2 },
      //  Тени для Android
      elevation: 8,
   },
});
