import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import {useVector, snapPoint} from 'react-native-redash'
import { Side } from './wave'
import { HEIGHT, LEFT_SNAP_POINTS, MARGIN_WIDTH, MIN_LEDGE, NEXT, PREV, RIGHT_SNAP_POINTS, WIDTH } from '@/configs/constants'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'


interface SliderProps {
  index : number
  children: JSX.Element
  prev?: JSX.Element
  next?: JSX.Element
  setIndex: (value: number) => void 
}
const Slider = ({
  index,
  children:current,
  prev,
  next,
  setIndex
}:SliderProps) => {

  const hasPrev = !!prev
  const hasNext = !!next
  const zIndex = useSharedValue(0)
  const activeSide = useSharedValue(Side.NONE);

  const isTransitionLeft = useSharedValue(false)
  const isTransitionRight = useSharedValue(false)
  const left = useVector(MIN_LEDGE, HEIGHT / 2);
  const right = useVector(MIN_LEDGE, HEIGHT / 2);

  const pandGesture = Gesture.Pan().onStart(({x}) => {
    if(x <= MARGIN_WIDTH && hasPrev){
      activeSide.value = Side.LEFT
      zIndex.value = 100
    }else if (x >= WIDTH - MARGIN_WIDTH && hasNext){
      activeSide.value = Side.RIGHT
    }else {
      activeSide.value = Side.NONE
    }
  }).onUpdate(({x,y}) => {
    if(activeSide.value === Side.LEFT) {
      left.x.value = Math.max(x, MARGIN_WIDTH)
      left.y.value = y
    }else if (activeSide.value === Side.RIGHT) {
      right.x.value = Math.max( WIDTH - x, MARGIN_WIDTH);
    }
  }).onBegin(({x, velocityX, velocityY}) => {
    if(activeSide.value === Side.LEFT){
      const dest = snapPoint(x, velocityX, LEFT_SNAP_POINTS)
      isTransitionLeft.value = dest === PREV
      left.x.value = withSpring(
        dest,
        {
          velocity: velocityX,
          overshootClamping: isTransitionLeft.value ? true : false,
          restSpeedThreshold: isTransitionLeft.value ? 100 : 0.01,
          restDisplacementThreshold: isTransitionLeft.value ? 100 : 0.01
        },
        () => {
          if(isTransitionLeft.value){
            runOnJS(setIndex)(index-1)
          }else {
            zIndex.value = 0 
            activeSide.value = Side.NONE
          }
        }
      );
      left.y.value = withSpring(HEIGHT / 2, {velocity: velocityY})
    }else if (activeSide.value === Side.RIGHT){
      const dest = snapPoint(x, velocityX, RIGHT_SNAP_POINTS)
      isTransitionRight.value = dest === NEXT;
      right.x.value = withSpring(
        WIDTH - dest, 
        {
          velocity: velocityX,
          overshootClamping: isTransitionRight.value ? true : false,
          restSpeedThreshold: isTransitionRight.value ? 100 : 0.01,
          restDisplacementThreshold: isTransitionRight.value ? 100 : 0.01,
        },
      () => {
        if(isTransitionRight.value){
          runOnJS(setIndex)(index + 1)
        }else {
          activeSide.value = Side.NONE
        }
      });

      right.y.value = withSpring(HEIGHT/ 2, {velocity: velocityY})
    }
  })

  const leftStyle = useAnimatedStyle(() => ({
    zIndex: zIndex.value
  }))


  useEffect(() => {
   if(Platform.OS === 'ios' ){
    right.x.value = withSpring(WIDTH * 0.167)
   }else {
    right.x.value = withSpring(WIDTH * 0.185)
   }
  }, [left, right])

  return (
  <GestureDetector gesture={pandGesture}>
    <Animated.View style={StyleSheet.absoluteFill}>
      {current}
      {
        prev && (
          <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>

          </Animated.View>
        )
      }

      {
        next && (
          <View style={StyleSheet.absoluteFill}>
           
          </View>
        )
      }
    </Animated.View>
  </GestureDetector>
  )
}

export default Slider

const styles = StyleSheet.create({})