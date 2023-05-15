import { TextInput, StyleSheet } from "react-native";
import React from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const DateInput = ({value, placeholder, changeDate}) => {
  const [date, setDate] = React.useState(new Date());

  const onChange = (event, currentDate) => {
    changeDate(
        `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, 0)}-${currentDate.getDate().toString().padStart(2, 0)}`
      );
    setDate(currentDate);
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      style={styles.input}
      onPressIn={showMode}
    />
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
    }
  });

export default DateInput;
