import React, { useState, useContext } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { AppCard } from '../components/ui/AppCard';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppButton } from '../components/ui/AppButton';
import { EditModal } from '../components/ui/EditModal';
import { THEME } from '../theme';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

export const TodoScreen = () => {
   const { todos, updateTodo, removeTodo } = useContext(TodoContext);
   const { todoId, changeScreen } = useContext(ScreenContext);
   const todo = todos.find((t) => t.id === todoId);
   const [modal, setModal] = useState(false);
   const saveHandler = (title) => {
      updateTodo(todo.id, title);
      setModal(false);
   };

   return (
      <View>
         <EditModal
            value={todo.title}
            onSave={saveHandler}
            visible={modal}
            onCancel={() => setModal(false)}
         />
         <AppCard style={styles.card}>
            <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
            <View style={styles.button}>
               <AppButton onPress={() => setModal(true)}>
                  <FontAwesome name="edit" size={20} />
               </AppButton>
            </View>
         </AppCard>
         <View style={styles.buttons}>
            <View style={styles.button}>
               {/* <Button title="Назад" color={THEME.GREY_COLOR} onPress={goBack} /> */}
               <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
                  <AntDesign name="back" size={20} color="#fff" />
               </AppButton>
            </View>
            <View style={styles.button}>
               <AppButton
                  color={THEME.DANGER_COLOR}
                  onPress={() => {
                     removeTodo(todo.id);
                  }}
               >
                  <FontAwesome name="remove" size={20} color="#fff" />
               </AppButton>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   card: {
      marginBottom: 20,
      padding: 15,
   },
   button: {
      width: Dimensions.get('window').width / 3,
   },
   title: {
      fontSize: 20,
   },
});