import React, { useContext, useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons' // @?? buradaki on ek olan '@' ne anlama geliyor, githubdan veri cek mi demek?

const IndexScreen = ({ navigation }) => {
   const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

   useEffect(()=>{
      getBlogPosts();

      const listener = navigation.addListener('didFocus', () => {
         getBlogPosts();
      });

      return () => {
         listener.remove();
      };
   }, []);

   return (
      <View>
         <FlatList
            data={state}
            keyExtractor={(blogPost) => blogPost.title}
            renderItem={({ item }) => {
               return (
                  <TouchableOpacity
                     onPress={() => navigation.navigate('Show', { id: item.id })}
                  >
                     <View style={styles.row}>
                        <Text style={styles.title}>
                           {item.title} - {item.id}
                        </Text>
                        <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                           <Feather name='trash' style={styles.icon} />
                        </TouchableOpacity>
                     </View>
                  </TouchableOpacity>
               );
            }}
         />
      </View>
   );
};

IndexScreen.navigationOptions = ({ navigation }) => {
   return {
      headerRight: () => (
         <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" size={30} />
         </TouchableOpacity>
      ),
   };
};

const styles = StyleSheet.create({
   icon: {
      fontSize: 24
   },
   row: {
      borderColor: 'pink',
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 20
   },
   title: {
      fontSize: 18
   }
});

export default IndexScreen;