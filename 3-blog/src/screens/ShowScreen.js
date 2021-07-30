import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../context/BlogContext';
// @?? Context as BlogContext yazinca hata verdi
import { EvilIcons } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
   const { state } = useContext(Context);

   const blogPost = state.find(
      (blogPost) => blogPost.id === navigation.getParam('id')
   );

   return (
      <View>
         <Text>{blogPost.title}</Text>
         <Text>{blogPost.content}</Text>
      </View>
   );
};

// Any time we want to show something inside the header we use navigationOptions function
ShowScreen.navigationOptions = ({ navigation }) => {
   return {
      headerRight: () => (
         <TouchableOpacity
            onPress={() =>
               navigation.navigate('Edit', { id: navigation.getParam('id') })
            }
         >
            <EvilIcons name="pencil" size={35} />
         </TouchableOpacity>
      ),
   };

}

const styles = StyleSheet.create({});

export default ShowScreen;