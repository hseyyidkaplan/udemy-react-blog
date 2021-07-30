import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';


// 'state' stands for 'blogPosts'
const blogReducer = (state, action) => {
   switch (action.type) {
      case 'delete_blogpost':
         return state.filter((blogPost) => blogPost.id !== action.payload);
      case 'edit-blogpost':
         return state.map(blogPost => {
            return blogPost.id === action.payload.id
               ? action.payload
               : blogPost;
         });
      case 'get_blogposts':
         return action.payload;
      default:
         return state;
   }
};

const addBlogPost = mesaj => {
   // @?? callback ozel bir keyword mu?, mesaj icinde mesaj fonksiyonunu cagirma syntax'ini anlamadim
   return async (title, content, callback) => {
      await jsonServer.post('/blogposts', {title, content})
      if (callback) {  // if callback exists
         callback(); // bu callback bir seyler yazip kaydettikten sonra anasayfaya donmeyi sagliyor
      }
   };
}; 

const deleteBlogPost = mesaj => {
   return async (id) => {
      await jsonServer.delete(`/blogposts/${id}`);

      // type: thing to do , id: id of post to delete
      // mesaj: dispatch .. sevk etmek
      mesaj({ type: 'delete_blogpost', payload: id });
   };
};

const editBlogPost = mesaj => {
   return async (id, title, content, callback) => {
      await jsonServer.put(`/blogposts/${id}`, {title, content});
      
      mesaj({
         type: 'edit-blogpost',
         payload: { id, title, content }
      });
      if (callback) {
         callback();
      }
   };
};

const getBlogPosts = mesaj => {
   return async () => {
      const response = await jsonServer.get('/blogposts'); // @?? await ne anlama geliyor
      // response.data === [{}, {}, {}, ...]

      // 'mesaj' fonksiyonu useReducer'i otomatik cagirir ve buradaki action'un yerindeki degeri doldurur
      mesaj({type: 'get_blogposts', payload: response.data})
   }
};

export const { Context, Provider } = createDataContext(
   blogReducer,
   { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
   []
);