import { useAtom } from "jotai";
import useChangeParamsInList, { IchangeParamsProps } from "./useChangeParamInList";
import useGetParams from "./useGetParams";
import { NumStr, topicData, wordData } from "../types/interfaces";
import { findElemByID } from "../function/findElementByID";
import { shuffleArray } from "../function/shufleArray";
import { SetStateAction, useState } from "react";
import { topicsData } from "../jotaiData/jotaiData";

interface ItestData {
   topicData: topicData[];
   setTopicData: (prev: (prev: topicData[]) => topicData[]) => void;
   setNewParamInTopicData: (data: IchangeParams) => void;
   sectionId: NumStr;
   myIterableList: wordData[];
   setMyIterableList: React.Dispatch<SetStateAction<wordData[]>>;
   reduceRate: (id: NumStr) => void;
   resetData: () => void;
}

interface IchangeParams extends Omit<IchangeParamsProps, "sectionId"> { }

function useTestData(): ItestData {
   const [topicData, setTopicData] = useAtom<topicData[]>(topicsData)
   const { setNewParamInTopicData } = useChangeParamsInList();

   const sectionId = useGetParams(topicData)

   const [myIterableList, setMyIterableList] = useState<wordData[]>(
      shuffleArray(findElemByID<topicData>(topicData, sectionId).data).sort(
         (a, b) => a.rate > b.rate ? -1 : 1)
   );

   return {
      topicData,
      setTopicData,
      setNewParamInTopicData: (data: IchangeParams) => {
         setNewParamInTopicData({ ...data, sectionId })
      },
      sectionId,
      myIterableList,
      setMyIterableList,
      reduceRate: (id: NumStr) => {
         if (findElemByID(findElemByID(topicData, sectionId).data, id).rate > 0)
            setNewParamInTopicData(
               {
                  sectionId,
                  id,
                  param: "rate",
                  newData: 1,
                  changeBy: "-"
               }
            )
      },
      resetData: () => {
         setMyIterableList(
            shuffleArray(findElemByID<topicData>(topicData, sectionId).data).sort(
               (a, b) => a.rate > b.rate ? -1 : 1)
         )
      }
   };
}

export default useTestData;
