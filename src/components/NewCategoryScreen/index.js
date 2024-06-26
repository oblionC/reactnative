import { View, Text, ScrollView, TextInput, SafeAreaView, KeyboardAvoidingView, StyleSheet, Animated, useWindowDimensions, TouchableWithoutFeedback, Pressable, Keyboard} from "react-native"
import { useState, useRef, useMemo, useEffect } from "react"
import { mainContainerStyle } from "../../styles/mainContainerStyle"
import { appBorderStyle } from "../../styles/appBorderStyle"
import { textboxStyle } from "../../styles/textboxStyle"
import TextInputBox from "../TextInputBox"
import MainLabel from "../TextComponents/MainLabel"
import EmojiPicker from "../EmojiPicker"
import { useHeaderHeight } from "@react-navigation/elements"
import AddButton from "../AddButton"
import React from "react"
import { textStyle } from "../../styles/textStyle"



export default function NewCategoryScreen({ route, navigation }) {
    const categories = route.params.categories
    const [categoryName, setCategoryName] = useState("")
    const [currentEmoji, setCurrentEmoji] = useState("")
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [shiftY, setShiftY] = useState(new Animated.Value(0))
    const animatedValue2 = useMemo(() => {
        return new Animated.Value(2)
    },[])
    const headerHeight = useHeaderHeight()
    const [offset, setOffset] = useState(headerHeight)

    const shiftUp = () => {
        Animated.timing(shiftY, {
            toValue: -460,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }
    const shiftDown = () => {
        Animated.timing (shiftY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    return(
        <View style={{height: "100%", width: "100%"}}>
            <Animated.View style={[mainContainerStyle.mainContainer, {transform: [{translateY: Animated.divide(shiftY, animatedValue2)}]}]}> 
            <Pressable style={{width: "100%", height: "100%"}} onPress={() => {
                shiftDown()
                Keyboard.dismiss()
            }}>
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-offset} >
                    <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <MainLabel>New category:</MainLabel>
                    <View>
                    {error && <View>
                        <Text style={{color: "red"}}>
                            {errorMessage}
                        </Text> 
                    </View>}
                    <TextInputBox 
                        onPress={() => {shiftDown()}}
                        value={categoryName} 
                        onChangeText={(text) => {
                            setError(false)
                            setCategoryName(text)
                        }}
                        keyboardType="default" />   
                    </View>
                    <TouchableWithoutFeedback onPress={() => {
                        setOffset(headerHeight + 200)
                        shiftUp()
                        Keyboard.dismiss()
                    }}>
                        <View style={[appBorderStyle.borderStyle, textboxStyle.textboxHeight, {width: 100, height: 50, justifyContent: "center", alignItems: "center"}]}><Text style={textStyle.emoji}>{ currentEmoji }</Text></View>
                    </TouchableWithoutFeedback>
                    <AddButton pressFunction={() => {
                        if(categoryName === "" && currentEmoji === "") {
                            setError(true);
                            setErrorMessage("You must set the name and emoji");
                            return;
                        }
                        else if(categoryName === "") {
                            setError(true);
                            setErrorMessage("Category name cannot be empty");
                            return;
                        }
                        else if(currentEmoji === "") {
                            setError(true);
                            setErrorMessage("You must select an emoji");
                            return;
                        }

                        let temp = categories
                        temp[categoryName] = currentEmoji
                        navigation.navigate("New", {newCategories: temp})
                    }}/>
                    </View>
                </KeyboardAvoidingView>
                </Pressable>
            </Animated.View>
            <EmojiPicker shiftY={shiftY} shiftDown={shiftDown} setCurrentEmoji={setCurrentEmoji} />
        </View>
    )
}
