import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { images } from '../constants/images';
import star from '@/assets/icons/star.png';
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
    console.log(poster_path)
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placeholder.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>{title}</Text>
        <View className="flex-row items-center">
            <Image source={icons.star} className="size-4 mr-1"/>
            <Text className="text-white text-sm uppercase font-bold">{Math.round(vote_average/2)}</Text>
        </View>
        <View className="flex-row items-center justify-between">
            <Text className="text-light-300 font-medium mt-1">
                {release_date?.split('-')[0]}
            </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
