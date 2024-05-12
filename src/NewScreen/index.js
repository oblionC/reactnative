import { StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native';
import { COLORS } from '../constants/colors';
import { useState } from 'react';
import isNumber from '../utils/isNumber';
import { mainContainerStyle } from '../styles/mainContainerStyle';

let userPfp = require('../../public/img/carb_2.png');

export default function NewScreen({navigation, amount, changeAmount}) {
  const [error, setError] = useState(false);
  const [inp, setInp] = useState("");

  const checkInput = () => {
    let inputValue;
    inputValue = parseInt(inp);
    if(isNaN(inputValue)) {
      setError(true);
      return;
    }
    changeAmount(amount + inputValue);
    navigation.navigate("Home");
  }
    
  return (
      <ScrollView contentContainerStyle={mainContainerStyle.mainContainer}>
        <View style={{justifyContent: "center", alignItems: "center", height: "100%"}}>
          <View>
            <Text style={{color: COLORS.tertiary}}>New spend:</Text>
          </View>
          <View style={styles.textboxContainer}>
            {/* Error lable in case user does not input number. Only appears when error triggered */}

            <View style={styles.errorLabel}>
              <Text style={{color: "red"}}>
                { error ? "Amount cannot be empty" : "" }
              </Text> 
            </View>

            <View style = {styles.textbox}>
              <TextInput style = {styles.inputBox} keyboardType="numeric" value={inp} onChangeText={(text) => {
                  if(isNumber(text) || text === "") {
                    setInp(text);
                  }
                }} />
            </View>
          </View>
          <Pressable style={ styles.addButton } onPress={() => {checkInput()}}>
            <Text>Add</Text>
          </Pressable>
        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 3,
    borderColor: COLORS.secondary,
    width: "100%",
    height: "100%",
    color: COLORS.text,
    padding: 10
  },
  textbox: {
    width: 300,
    height: 70,
  },
  textboxContainer: {
    width: 300,

  },
  addButton: {
    backgroundColor: COLORS.tertiary,
    borderWidth: 3,
    borderColor: COLORS.secondary, 
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
})