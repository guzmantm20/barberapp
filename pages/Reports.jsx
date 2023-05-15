import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import useUser from "../hooks/useUser";
import useConection from "../hooks/useConection";
import { AntDesign } from "@expo/vector-icons";
import SearchDateBar from "../components/SearchDateBar";
import Credits from "../components/Credits";
import { FontAwesome } from '@expo/vector-icons';

const Reports = ({ navigation }) => {
  const { getData } = useUser();
  const { sendData } = useConection();
  const [reports, setReports] = useState();
  const [searchActive, setSearchActive] = useState(false);
  const [totalActive, setTotalActive] = useState(false);
  const flatList = useRef(null);
  const hoy = new Date();
  const parseDate = `${hoy.getFullYear()}-${(hoy.getMonth() + 1)
    .toString()
    .padStart(2, 0)}-${hoy.getDate().toString().padStart(2, 0)}`;

  const initialData = async (startDate, endDate) => {
    const data = JSON.parse(await getData());
    searchActive && setSearchActive(false)
    setReports(
      await sendData({ ...data, ...{ startDate, endDate } }, "reports")
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: "row",}}>
          <TouchableOpacity
            color="#008ae8"
            title="Button"
            onPress={() => {
              setTotalActive(!totalActive);
              setSearchActive(false);
            }}
            style={{ margin: 10 }}
          >
            {totalActive ? (
              <AntDesign name="close" size={32} color="white" />
            ) : (
              <FontAwesome name="usd" size={32} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            color="#008ae8"
            title="Button"
            onPress={() => {
              setSearchActive(!searchActive);
              setTotalActive(false);
            }}
            style={{ margin: 10 }}
          >
            {searchActive ? (
              <AntDesign name="close" size={32} color="white" />
            ) : (
              <AntDesign name="search1" size={32} color="white" />
            )}
          </TouchableOpacity>
        </View>
      ),
    });

    const unsubscribe = navigation.addListener("focus", () => {
      initialData(parseDate, parseDate);
    });
    return unsubscribe;
  }, [navigation, searchActive, totalActive]);

  const renderReports = ({ item }) => (
    <View
      style={[
        styles.card,
        item.paytype == 92 && { backgroundColor: "#008ae8" },
        item.paytype == 94 && { backgroundColor: "#918c00" },
        item.paytype == 1 && { backgroundColor: "#32e36d" },
        item.paytype == 6 && { backgroundColor: "#f28e4b" },
      ]}
    >
      <View style={{ marginLeft: 10, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text>
            {item.username} - {item.refe}
          </Text>
          <Text>{item.created_at}</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {"$ "}
            {parseInt(item.amount)
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      {searchActive && <SearchDateBar initialData={initialData}/>}
      {totalActive && <Credits pays={reports.pays} courts={reports.courts} spents={reports.spents} gains={reports.gains}/>}
      {reports && (
        <FlatList
          ref={flatList}
          onContentSizeChange={() => {
            flatList.current.scrollToEnd({ animated: true });
          }}
          contentContainerStyle={styles.container}
          keyExtractor={(item) => item.dataId}
          data={reports.data}
          renderItem={renderReports}
          numColumns={1}
          scrollToEnd={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 3,
    borderRadius: 25,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    padding: 5,
    paddingBottom: 55,
  },
});

export default Reports;
