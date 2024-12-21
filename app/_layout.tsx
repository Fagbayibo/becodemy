import React from 'react'
import { ThemeProvider } from '@/context/theme.context'
import { Stack } from 'expo-router'
import '../global.css'

export default function RootLayout() {
  return (
    <ThemeProvider>
    <Stack screenOptions={{headerShown: false}}>
 <Stack.Screen name='index' />
 <Stack.Screen name='(routes)/onboarding/index' options={{}}/>
      </Stack>
    </ThemeProvider>
  )
}