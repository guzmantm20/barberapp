import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React from "react";
import Style from "./Style";
import DateInput from "./DateInput";
const SearchDateBar = ({initialData}) => {
  const date = new Date()
  const parseDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
  const [startDate, setStartDate] = React.useState(parseDate);
  const [endDate, setEndDate] = React.useState(parseDate);
  return (
    <View style={styles.contentSeach}>
      <DateInput placeholder={"Desde"} changeDate={setStartDate} value={startDate}/>
      <DateInput placeholder={"Hasta"} changeDate={setEndDate} value={endDate}/>
      <TouchableOpacity
        style={[Style.button, { backgroundColor: "#f28e4b", width: "25%" }]}
        title="Button"
        onPress={() => {initialData(startDate, endDate)}}
      >
        <Text style={Style.textStyle}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    zIndex: 1,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 25,
    color: "#000",
    borderWidth: 1,
    width: "35%",
    paddingLeft: 10,
  },
  contentSeach: {
    padding: 5,
    position: "absolute",
    zIndex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000000c7",
  },
});

export default SearchDateBar;
