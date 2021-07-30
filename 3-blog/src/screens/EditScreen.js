import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';


const EditScreen = ({ navigation }) => {
   const id = navigation.getParam('id');
   //@?? useContext ne ise yariyor anlamadim
   const { state, editBlogPost } = useContext(Context);

   const blogPost = state.find(
      blogPost => blogPost.id === id
   );

   return (
      <BlogPostForm
         initialValues={{ title: blogPost.title, content: blogPost.content }}
         onSubmit={(title, content) => {
            editBlogPost(id, title, content, () => navigation.pop());
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

export default EditScreen;