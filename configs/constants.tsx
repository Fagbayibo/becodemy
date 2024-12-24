import { IsIPAD } from "@/themes/app.constant";
import { Dimensions, Image } from "react-native";
import {verticalScale} from "react-native-size-matters"
// @ts-ignore
import One from "@/assets/images/onboarding/1.png"
// @ts-ignore
import Two from "@/assets/images/onboarding/2.png"
// @ts-ignore
import Three from "@/assets/images/onboarding/3.png"




export const onBoardingSlides: onBoardingSlidesTypes[] = [
    {
        color: "#40e0d0",
        title: "Explore",
        image: (
            <Image 
            source={One}
            style={{
                width: IsIPAD ? verticalScale(285) : verticalScale(330),
                height: IsIPAD? verticalScale(345) : verticalScale(330),
            }}/>
        ),
        secondTitle: "Our Community",
        subTitle: "Find the perfect course to enhance your carrer prospect"

    },
    {
        color: "#a7f893",
        title: "Explore",
        image: (
            <Image 
            source={Two}
            style={{
                width: IsIPAD ? verticalScale(285) : verticalScale(330),
                height: IsIPAD? verticalScale(345) : verticalScale(330),
            }}/>
        ),
        secondTitle: "Own Goal",
        subTitle: "Personalize your study plan with flexible timelines than traditional"

    },
    {
        color: "#ffc0cb",
        title: "Explore",
        image: (
            <Image 
            source={Three}
            style={{
                width: IsIPAD ? verticalScale(285) : verticalScale(330),
                height: IsIPAD? verticalScale(345) : verticalScale(330),
            }}/>
        ),
        secondTitle: "Our Community",
        subTitle: "Find the perfect course to enhance your carrer prospect"

    },
]

// Onboarding variables

export const MIN_LEDGE = 25;
export const {width: WIDTH, height: HEIGHT} = Dimensions.get("screen")
export const MARGIN_WIDTH = MIN_LEDGE + 50;
export const PREV = WIDTH
export const NEXT = 0
export const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
export const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];


export enum Side {
    LEFT,
    RIGHT,
    NONE
}