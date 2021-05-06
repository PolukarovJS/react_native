import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Alert, Keyboard } from 'react-native';
import { THEME } from '../theme';
import { AntDesign } from '@expo/vector-icons';

export const AddToDo = ({ onSubmit }) => {
   const [value, setValue] = useState('');
   const pressHandler = () => {
      if (value.trim()) {
         onSubmit(value);
         setValue('');
         Keyboard.dismiss();
      } else {
         Alert.alert('Название дела не может быть пустым!');
      }
   };

   return (
      <View style={styles.block}>
         <TextInput
            style={styles.input}
            // onChangeText={text => setValue(text)}
            onChangeText={setValue}
            autoCorrect={false}
            value={value}
            placeholder="Введите название дела"
         />
         <AntDesign.Button onPress={pressHandler} name="pluscircleo">
            Добавить
         </AntDesign.Button>

         {/* <Button title="Добавить" onPress={pressHandler} /> */}
      </View>
   );
};

const styles = StyleSheet.create({
   block: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
   },
   input: {
      width: '60%',
      padding: 10,
      borderStyle: 'solid',
      borderBottomWidth: 2,
      borderBottomColor: THEME.MAIN_COLOR,
   },
});
