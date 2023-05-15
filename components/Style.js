import { StyleSheet } from "react-native";

export default StyleSheet.create({
  label: {
    color: "white",
    marginBottom: 10,
    marginLeft: 0,
  },
  button: {
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    backgroundColor: "#008ae8",
    textAlign: "center"
  },
  textStyle: {
    color: "#fff",
    textAlign: "center"
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0)',
    padding:0,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    color: "white"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "#141112",
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
