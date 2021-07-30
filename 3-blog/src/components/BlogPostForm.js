// components klasörü reusable kodlar için oluşturulur
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const BlogPostForm = ({ initialValues, onSubmit }) => {
   const [content, setContent] = useState(initialValues.content);
   const [title, setTitle] = useState(initialValues.title);

   return (
      <View>
         <Text style={stil.label} valu>Başlık Girin</Text>
         <TextInput
            style={stil.input}
            value={title}
            onChangeText={text => setTitle(text)}
         />
         <Text style={stil.label}>İçerik Girin</Text>
         <TextInput
            style={stil.input}
            value={content}
            onChangeText={text => setContent(text)}
         />
         <Button
            onPress={() => onSubmit(title, content)}
            title='İçeriği Kaydet'
         />
      </View>
   );
};

// @?? defaultProps eger daha once bir deger atanmamissa defaultProps altindaki 'props'a o zaman ona default degerleri atar (mi?)
BlogPostForm.defaultProps = {
   initialValues: {
      title: '',
      content: ''
   }
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

export default BlogPostForm;