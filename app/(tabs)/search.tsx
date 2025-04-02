import { View, Text ,Image,FlatList} from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { useRouter } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'

const search = () => {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode='cover'/>
      <FlatList data={movies} renderItem={({item})=><MovieCard {...item}/>}/>
    </View>
  )
}

export default search