import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { Redirect } from 'expo-router'
const index = () => {

  const [loggedInUser, setLoggedInUser] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
     const subscription = async () => {
      const token = SecureStore.getItem("accessToken")
      console.log(token)
      setLoggedInUser(token ? true : false)
     }
     subscription()
  }, [])
  return (
  <>
   {
     loading ? (

      <></>
     ) : (
      <Redirect href={!loggedInUser ? '/(routes)/onboarding' : '/(tabs)'}/>
     )
   }
  </>
  )
}

export default index

const styles = StyleSheet.create({})