import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { characterImages } from "@/constants";

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

  const data: any[] = [];

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
            className="mt-10"
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View className="border-[0.5px] border-gray-200 p-5 rounded-md gap-y-4">
                <View className="flex flex-row items-center gap-x-2">
                  <Image
                    source={characterImages[Number(index)]}
                    className="w-12 h-12 rounded-full"
                    resizeMethod="auto"
                  />
                  <Text className="text-white text-2xl font-semibold">
                    {item.name}
                  </Text>
                </View>
                <View>
                  <Text className="text-white/60 text-sm">
                    {item.films.length} Films
                  </Text>
                  <Text className="text-white/60 text-sm">
                    {item.vehicles.length} Vehicles
                  </Text>
                  <Text className="text-white/60 text-sm">
                    {item.starships.length} Starships
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push(`/characters/${index + 1}`)}
                  className="flex flex-row items-center justify-center gap-2 border rounded-full py-2 border-white/30"
                >
                  <Text className="text-white/80 text-lg">View more</Text>
                  <Ionicons name="arrow-forward" size={16} color="#ceb8b8" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.name}
            ItemSeparatorComponent={() => (
              <View className="h-[0.5px] bg-white w-full my-5" />
            )}
            ListEmptyComponent={() => (
              <Text className="text-white text-lg text-center font-semibold">
                No items found.
              </Text>
            )}
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
