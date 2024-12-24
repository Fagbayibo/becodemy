import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { onBoardingSlides } from '@/configs/constants'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Slider from '@/components/onboarding/slider'
import Slide from '@/components/onboarding/slide'


const OnboardingScreen = () => {
  const [index, setIndex] = useState(0)
  const prev = onBoardingSlides[index-1]
  const next = onBoardingSlides[index + 1]

  return (
<GestureHandlerRootView style={{flex: 1}}>
<Slider key={index} index={index} setIndex={index} prev={prev && <Slide slide={prev} totalSlides={onBoardingSlides.length}/>}
 next ={next && <Slide slide={next} totalSlides={onBoardingSlides.length}/>}
>

</Slider>
</GestureHandlerRootView>
  )
}

export default OnboardingScreen
