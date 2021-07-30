import createDataContext from './createDataContext';

// 'state' stands for 'blogPosts'
const blogReducer = (state, action) => {
   switch (action.type) {
      case 'add_blogpost':
         return [
            ...state,
            {
               content: action.payload.content,
               id: Math.floor(Math.random() * 99999), // @?? bu random fonksionu her seferinde farkli uretecek mi?
               title: action.payload.title

            }
         ];
      case 'delete_blogpost':
         return state.filter((blogPost) => blogPost.id !== action.payload);
      case 'edit-blogpost':
         return state.map(blogPost => {
            return blogPost.id === action.payload.id
               ? action.payload
               : blogPost;
         });
      default:
         return state;
   }
};

const addBlogPost = mesaj => {
   // @?? callback ozel bir keyword mu?, mesaj icinde mesaj fonksiyonunu cagirma syntax'ini anlamadim
   return (title, content, callback) => {
      mesaj({ type: 'add_blogpost', payload: { title, content } });  // mesaj: dispatch
      if (callback) {  // if callback exists
         callback(); // bu callback bir seyler yazip kaydettikten sonra anasayfaya donmeyi sagliyor
      }
   };
};
const editBlogPost = mesaj => {
   return (id, title, content, callback) => {
      mesaj({
         type: 'edit-blogpost',
         payload: { id, title, content }
      });
      if (callback) {
         callback();
      }
   };
};

const deleteBlogPost = mesaj => {
   return (id) => {
      // type: thing to do , id: id of post to delete
      mesaj({ type: 'delete_blogpost', payload: id });
   };
};

export const { Context, Provider } = createDataContext(
   blogReducer,
   { addBlogPost, deleteBlogPost, editBlogPost },
   [{ title: 'deneme baslik', content: 'deneme icerik', id: 1 }]
);