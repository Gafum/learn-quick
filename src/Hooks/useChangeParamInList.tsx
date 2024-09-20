import { useSetAtom } from "jotai";
import { NumStr, topicData } from "../Types_temp/interfaces";
import { topicsData } from "../JotaiData_temp/jotaiData";
import { findIndexOfELement } from "../Function_temp/findElementByID";

export interface IchangeParamsProps {
   sectionId: NumStr;
   id: NumStr;
   param: "img" | "rate" | "meaning" | "word";
   newData: NumStr;
   changeBy?: "+" | "-" | "*" | "/" | false;
}

interface IsetParamsInList extends IchangeParamsProps {
   setTopicData: (prev: (prev: topicData[]) => topicData[]) => void;
}

// Change Parameter in TopicData list. Parameters: sectionId - id of current list, id - id of element, param - param that should e change, newData - data that will be inside Parameter
function setParamsInList({
   sectionId,
   id,
   param,
   newData,
   changeBy = false,
   setTopicData,
}: IsetParamsInList) {
   setTopicData((prev: topicData[]) => {
      const localList = JSON.parse(JSON.stringify(prev));
      const currentListIndex = findIndexOfELement(localList, sectionId);
      if (currentListIndex === -1) return prev; // Section not found

      const currentElementIndex = findIndexOfELement(localList[currentListIndex].data, id);
      if (currentElementIndex === -1) return prev; // Element not found

      const currentElement = localList[currentListIndex].data[currentElementIndex];
      const currentParam = currentElement[param];

      // Check type consistency
      if (typeof currentParam !== typeof newData) {
         return prev;
      }

      if (changeBy && typeof currentParam === "number") {
         const newValue: number = eval(
            `${currentParam} ${changeBy} ${newData}`
         );
         (localList[currentListIndex].data[currentElementIndex][param] as number) = newValue;
      } else {
         (localList[currentListIndex].data[currentElementIndex][param] as NumStr) = newData;
      }

      return localList;
   });
}

function useChangeParamsInList() {
   const setTopicData = useSetAtom(topicsData);
   return {
      setNewParamInTopicData: (data: IchangeParamsProps) => {
         setParamsInList({ ...data, setTopicData })
      }
   };
}

export default useChangeParamsInList;
