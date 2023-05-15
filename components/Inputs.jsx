import { Text, TextInput } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import Style from "../components/Style";
const Inputs = ({ name, control, aditional, textLabel }) => {
  return (
    <>
      <Text style={Style.label}>{textLabel}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...aditional}
            style={Style.input}
            onBlur={onBlur}
            valueAsNumber="true"
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name={name}
        rules={{ required: true }}
      />
    </>
  );
};

export default Inputs;
