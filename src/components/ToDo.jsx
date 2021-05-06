import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AppText } from '../components/ui/AppText';

export const ToDo = ({ todo, removeTodo, onOpen }) => {
   const longPressHandler = () => {
      removeTodo(todo.id);
   };

   return (
      <TouchableOpacity
         activeOpacity={0.5}
         onPress={() => onOpen(todo.id)}
         onLongPress={longPressHandler}
         /*2 вариант onLongPress={removeTodos.bind(null, todo.id)} */
         /*3 вариант onLongPress={() => removeTodos(todo.id)} */
      >
         <View style={styles.todo}>
            <AppText>{todo.title}</AppText>
         </View>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   todo: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 5,
      marginBottom: 10,
   },
});
