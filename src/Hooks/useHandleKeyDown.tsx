import { useCallback, useEffect } from "react";

interface IuseHandleKeyDownProps {
   callback: (event: KeyboardEvent) => void;
   dependencyList: any[];
}

function useHandleKeyDown({ callback, dependencyList }: IuseHandleKeyDownProps) {
   // keybord Events
   const handleKeyDown = useCallback((event: KeyboardEvent) => {
      callback(event)

   }, [...dependencyList]);

   // add and remove keybord event handler
   useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [handleKeyDown]);
}

export default useHandleKeyDown;