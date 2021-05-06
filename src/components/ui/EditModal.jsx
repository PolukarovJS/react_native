import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Modal, Alert } from 'react-native';
import { THEME } from '../../theme';
import { AppButton } from './AppButton';

export const EditModal = ({ visible, onCancel, value, onSave }) => {
   const [title, setTitle] = useState(value);
   const saveHandler = () => {
      if (title.trim().length < 3) {
         Alert.alert(
            'Ошибка',
            `Значение title не может быть менее 3, сейчас ${title.trim().length} символов.`
         );
      } else {
         onSave(title);
      }
   };
   const cancelHandler = () => {
      setTitle(value);
      onCancel();
   };
   return (
      <Modal visible={visible} animationType="slide">
         <View style={styles.wrap}>
            <TextInput
               value={title}
               style={styles.input}
               placeholder="Введите название"
               onChangeText={setTitle}
               autoCapitalize="none"
               autoCorrect={false}
               maxLength={64}
            />
            <View style={styles.buttons}>
               <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
                  Отменить
               </AppButton>
               <AppButton onPress={saveHandler}>Сохранить</AppButton>
            </View>
         </View>
      </Modal>
   );
};

const styles = StyleSheet.create({
   wrap: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   input: {
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: THEME.MAIN_COLOR,
      width: '80%',
   },
   buttons: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 10,
   },
});
