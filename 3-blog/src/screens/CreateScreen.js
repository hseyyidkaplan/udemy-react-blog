import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';


const CreateScreen = ({ navigation }) => {
   const { addBlogPost } = useContext(Context);

   return (
      <BlogPostForm
         onSubmit={(title, content) => {
            addBlogPost(title, content, () => navigation.navigate('Index'));
         }}
      />
   );
};

const stil = StyleSheet.create({
   input: {
      borderColor: 'pink',
      borderWidth: 1,
      fontSize: 18,
      margin: 5,
      marginBottom: 15, // marginBottom overrides margin's value
      padding: 5  // yazi ile sınır çizgileri(border) arasındaki boşluk
   },
   label: {
      fontSize: 20,
      marginBottom: 5,
      marginLeft: 5
   }
});

export default CreateScreen;