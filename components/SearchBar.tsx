import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const SearchBar = () => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-5'>
        <Image source={icons.search} className='size-10' resizeMode='contain' tintColor="#ab8bff"/>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})