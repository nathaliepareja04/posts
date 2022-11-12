import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, {useState,useEffect, useCallback} from 'react'
import { colors } from '../config/colors.js'
import { SPACING } from '../config/spacing.js'
import axios from "axios"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import {useNavigation,useIsFocused} from "@react-navigation/native"
import {LinearGradient} from "expo-linear-gradient"
import Post from '../components/Post.jsx'

export default function PostScreen() {

  const [posts,setPosts]=useState([])
  const {top}=useSafeAreaInsets()
  const [isRefreshing,setIsRefreshing]=useState()
  const navigation=useNavigation()
  const isFocused=useIsFocused()

  const getPosts=async()=>{
    try {
      const {data}=await axios.get("/post")
      setPosts(data.data)
    } catch (error) {
      console.log("error en getPosts", error.message)
    }
  }

  useEffect(() => {
    isFocused && getPosts()
  }, [isFocused])

  const onRefresh=useCallback(async()=>{
    setIsRefreshing(true)
    await getPosts()
    setIsRefreshing(false)
  },[])

  return (
    <>
    <View style={{...styles.container,top:+ 50}}>
      <Text style={styles.title}>Post</Text>
      <Text style={styles.subtitle}>Image</Text>

      <TouchableOpacity style={{...styles.button,top}} onPress={()=>navigation.navigate("PostActionScreen")}>
        <LinearGradient style={styles.gradient} colors={[colors["dark-gray"],colors.dark]}>
          <Ionicons name='add-outline' color={colors.light} size={20}/>
        </LinearGradient>
      </TouchableOpacity>

    </View>

    {/*listar posts */}
    <FlatList data={posts} renderItem={({item})=> <Post post={item}/>} keyExtractor={item=>item._id.toString()} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={[colors.light]} progressBackgroundColor={colors["dark-gray"]}/>}/>
    </>
  )
}

const styles = StyleSheet.create({
    
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },

  title: {
    color: colors.white,
    fontSize: SPACING * 5,
    fontWeight: "700",
  },

  subtitle: {
    color: colors.light,
    marginTop: SPACING / 2,
  },

  button: {
    overflow: "hidden",
    borderRadius: 5,
    position: "absolute",
    right: 0 
  },

  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  }

})