import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { characterImages } from "@/constants";

const CharacterDetails = () => {
  const { id } = useLocalSearchParams();
  const [character, setCharacter] = useState<any | null>(null);
  const [homeWorld, setHomeWorld] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchData();
    //console.log("id", id);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(`https://swapi.dev/api/people/${id}`);
      setCharacter(response.data);
      const homeWorld = await axios.get(response.data.homeworld);
      setHomeWorld(homeWorld.data);
    } catch (error) {
      setError(true);
      Alert.alert("Error", "Failed to fetch data, try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#000000", "#200D42", "#4F21A1", "#A46EDB"]}>
      <SafeAreaView className="px-4 h-full w-full">
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size={"large"} className="my-10" />
          ) : (
            <View className="gap-y-4 mt-10">
              <Text className="text-4xl font-bold mb-5 text-white text-center">
                {character?.name}
              </Text>
              <Image
                source={characterImages[Number(id) - 1]}
                className="h-[300px]"
                resizeMode="contain"
              />
              <View className="gap-y-2 mb-5">
                <Text className="text-white text-2xl font-medium">
                  Personal Details
                </Text>
                <Text className="text-white/60">
                  A summary of core biographical information, including physical
                  attributes and birth details.
                </Text>
                <View className="mt-3 gap-y-2">
                  <View className="flex flex-row gap-x-3">
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Height</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {character?.height}
                      </Text>
                    </View>
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Mass</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {character?.mass}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row gap-x-3">
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Hair Color</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {character?.hair_color !== "unknown"
                          ? character?.hair_color
                          : "N/A"}
                      </Text>
                    </View>
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Skin Color</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {character?.skin_color}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row gap-x-3">
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Eye Color</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {character?.eye_color}
                      </Text>
                    </View>
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Birth Year</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {character?.birth_year}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row gap-x-3">
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md w-1/2">
                      <Text className="text-white text-lg">Gender</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {character?.gender !== "unknown" || "n/a"
                          ? character?.gender
                          : "N/A"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="gap-y-2 mb-10">
                <Text className="text-white text-2xl font-medium">
                  Origin Planet
                </Text>
                <Text className="text-white/60">
                  Information about home planet, providing context like
                  upbringing and background.
                </Text>
                <View className="mt-3 gap-y-2">
                  <View className="flex flex-row gap-x-3">
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Name</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {homeWorld?.name}
                      </Text>
                    </View>
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Climate</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {homeWorld?.climate}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row gap-x-3">
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">
                        Rotation Period
                      </Text>
                      <Text className="text-base text-white/60 capitalize">
                        {homeWorld?.rotation_period}
                      </Text>
                    </View>
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Orbital Period</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {homeWorld?.orbital_period}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row gap-x-3">
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Diameter</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {homeWorld?.diameter}
                      </Text>
                    </View>
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Gravity</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {homeWorld?.gravity}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row gap-x-3">
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Terrain</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {homeWorld?.terrain}
                      </Text>
                    </View>
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Surface Water</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {homeWorld?.surface_water}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row gap-x-3">
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">Population</Text>
                      <Text className="text-base text-white/60 capitalize">
                        {homeWorld?.population}
                      </Text>
                    </View>
                    <View className="border-[0.5px] border-gray-200 p-2 rounded-md flex-1">
                      <Text className="text-white text-lg">
                        Number of Residence
                      </Text>
                      <Text className="text-base text-white/60 capitalize">
                        {homeWorld?.residents.length}
                      </Text>
                    </View>
                  </View>
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
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CharacterDetails;

const styles = StyleSheet.create({});
