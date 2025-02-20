import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const CharacterDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [character, setCharacter] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(`${id}`);
      setCharacter(response.data);
    } catch (error) {
      setError(true);
      Alert.alert("Error", "Failed to load character, try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#000000", "#200D42", "#4F21A1", "#A46EDB"]}>
      <SafeAreaView className="px-4 h-full w-full">
        <TouchableOpacity
          onPress={() => {
            router.replace("/");
          }}
          className="w-full flex justify-end items-start mt-8"
        >
          <Text className="text-white text-md border border-gray-200 rounded-lg p-2">
            Go Back
          </Text>
        </TouchableOpacity>
        <Text className="text-4xl font-bold mt-8 text-white text-center">
          {character?.name}
        </Text>
        {loading ? (
          <ActivityIndicator size={"large"} className="my-10" />
        ) : (
          <View className="grid grid-cols-2 gap-y-4 mt-10">
            <View className="flex flex-row gap-x-4 justify-between">
              <View className="border border-gray-200 p-4 rounded-md w-full flex-1">
                <Text className="text-2xl font-semibold text-white">
                  Height
                </Text>
                <Text className="capitalize text-white">
                  {character?.height}
                </Text>
              </View>
              <View className="border border-gray-200 p-4 rounded-md w-full flex-1">
                <Text className="text-2xl font-semibold text-white">Mass</Text>
                <Text className="capitalize text-white">{character?.mass}</Text>
              </View>
            </View>
            <View className="flex flex-row gap-x-4 justify-between">
              <View className="border border-gray-200 p-4 rounded-md w-full flex-1">
                <Text className="text-2xl font-semibold text-white">
                  Hair Color
                </Text>
                <Text className="capitalize text-white">
                  {character?.hair_color !== "unknown"
                    ? character?.hair_color
                    : "N/A"}
                </Text>
              </View>
              <View className="border border-gray-200 p-4 rounded-md w-full flex-1">
                <Text className="text-2xl font-semibold text-white">
                  Skin Color
                </Text>
                <Text className="capitalize text-white">
                  {character?.skin_color}
                </Text>
              </View>
            </View>
            <View className="flex flex-row gap-x-4 justify-between">
              <View className="border border-gray-200 p-4 rounded-md w-full flex-1">
                <Text className="text-2xl font-semibold text-white">
                  Eye Color
                </Text>
                <Text className="capitalize text-white">
                  {character?.eye_color}
                </Text>
              </View>
              <View className="border border-gray-200 p-4 rounded-md w-full flex-1">
                <Text className="text-2xl font-semibold text-white">
                  Birth Year
                </Text>
                <Text className="capitalize text-white">
                  {character?.birth_year}
                </Text>
              </View>
            </View>
            <View className="flex flex-row gap-x-4 justify-between">
              <View className="border border-gray-200 p-4 rounded-md w-full flex-1">
                <Text className="text-2xl font-semibold text-white">
                  Gender
                </Text>
                <Text className="capitalize text-white">
                  {character?.gender !== "unknown" || "n/a"
                    ? character?.gender
                    : "N/A"}
                </Text>
              </View>
              <View className="border border-gray-200 p-4 rounded-md w-full flex-1">
                <Text className="text-2xl font-semibold text-white">
                  Birth Year
                </Text>
                <Text className="capitalize text-white">
                  {character?.birth_year}
                </Text>
              </View>
            </View>
          </View>
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

export default CharacterDetails;
