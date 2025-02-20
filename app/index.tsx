import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const Characters = () => {
  const router = useRouter();
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get("https://swapi.dev/api/people/");
      setCharacters(response.data.results);
    } catch (error) {
      console.error(error);
      setError(true);
      Alert.alert("Error", "Failed to load characters, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#000000", "#200D42", "#4F21A1", "#A46EDB"]}>
      <SafeAreaView className="px-4 w-full h-full">
        <Text className="text-4xl font-bold mt-4 text-white">
          Star Wars Characters
        </Text>
        {loading ? (
          <ActivityIndicator size={"large"} className="my-10" />
        ) : (
          <FlatList
            data={characters}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                className="border border-gray-200 py-2 pl-5 rounded-md mb-4"
                onPress={() =>
                  router.push(`/characters/${encodeURIComponent(item.url)}`)
                }
              >
                <Text className="text-white text-lg">{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.name}
            className="mt-10"
          />
        )}

        {error && (
          <TouchableOpacity
            onPress={fetchData}
            className="flex w-full items-center justify-center py-2 bg-white rounded-md mb-5"
          >
            <Text className="text-black font-semibold">Retry</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Characters;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  container: {
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    color: "#000",
  },
});
