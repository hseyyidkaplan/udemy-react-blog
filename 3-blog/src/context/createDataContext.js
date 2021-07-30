import React, { useReducer } from "react"

export default (reducer, actions, initialState) => {
   const Context = React.createContext();

   const Provider = ({ children }) => {
      // mesaj: dispatch .. sevk etmek
      const [state, mesaj] = useReducer(reducer, initialState);

      // actions === { addBlogPost: (mesaj) => { return () => {} }}
      const boundActions = {};
      for (let key in actions) {
         boundActions[key] = actions[key](mesaj);
      }

      return <Context.Provider value={{ state, ...boundActions }}>
         {children}
      </Context.Provider >
   }

   return { Context, Provider };
};