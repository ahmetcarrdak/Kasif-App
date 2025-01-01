import React, { createContext, useState, useContext } from "react";

interface ShareContextType {
  isShareVisible: boolean;
  setShareVisible: (visible: boolean) => void;
}

//@ts-ignore
const ShareContext = createContext();

//@ts-ignore
export const ShareProvider = ({ children }) => {
  const [isShareVisible, setShareVisible] = useState(false);

  return (
    <ShareContext.Provider value={{ isShareVisible, setShareVisible }}>
      {children}
    </ShareContext.Provider>
  );
};

export const useShareContext = () => useContext(ShareContext);
