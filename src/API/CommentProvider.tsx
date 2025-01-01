import React, { createContext, useState, useContext } from "react";

interface CommentContextType {
  isCommentVisible: boolean;
  setCommentVisible: (visible: boolean) => void;
}

//@ts-ignore
const CommentContext = createContext();

//@ts-ignore
export const CommentProvider = ({ children }) => {
  const [isCommentVisible, setCommentVisible] = useState(false);

  return (
    <CommentContext.Provider value={{ isCommentVisible, setCommentVisible }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => useContext(CommentContext);
