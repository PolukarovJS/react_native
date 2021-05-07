import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import { AddToDo } from '../components/AddToDo';
import { ToDo } from '../components/ToDo';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todoContext';
import { THEME } from '../theme';

export const MainScreen = () => {
   const { todos, loading, error, addTodo, removeTodo, fetchTodos } = useContext(TodoContext);
   const { changeScreen } = useContext(ScreenContext);
   const [deviceWidth, setDeviceWidth] = useState(
      Dimensions.get('window').width - THEME.PADDING_HORINONTAL * 2
   );
   // Для предотвращения проблем с React оборачиваем fetchTodos хуком useCallback
   // Избегаем лишних рендэрингов
   const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

   useEffect(() => {
      loadTodos();
   }, []);

   useEffect(() => {
      const update = () => {
         const width = Dimensions.get('window').width - THEME.PADDING_HORINONTAL * 2;
         setDeviceWidth(width);
      };
      Dimensions.addEventListener('change', update);
      return () => {
         Dimensions.removeEventListener('change', update);
      };
   });

   if (loading) {
      return <AppLoader />;
   }

   if (error) {
      return (
         <View style={styles.center}>
            <AppText style={styles.error}>{error}</AppText>
            <AppButton onPress={loadTodos}>Повторить</AppButton>
         </View>
      );
   }

   let content = (
      <View style={{ width: deviceWidth }}>
         <FlatList
            keyExtractor={(item) => item.id}
            data={todos}
            renderItem={({ item }) => (
               <ToDo onOpen={changeScreen} todo={item} removeTodo={removeTodo} />
            )}
         />
      </View>
   );
   if (todos.length === 0) {
      content = (
         <View style={styles.imgWrap}>
            <Image style={styles.image} source={require('../../assets/no-items.png')} />
         </View>
      );
   }
   return (
      <View>
         <AddToDo onSubmit={addTodo} />
         {content}
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
      width: '70%',
      padding: 10,
      borderStyle: 'solid',
      borderBottomWidth: 2,
      borderBottomColor: '#3949ab',
   },
   imgWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      height: 300,
   },
   image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
   },
   center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   error: {
      fontSize: 20,
      color: THEME.DANGER_COLOR,
   },
});
