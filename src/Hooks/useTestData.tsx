import { useAtom } from "jotai";
import useChangeParamsInList, { IchangeParamsProps } from "./useChangeParamInList";
import useGetParams from "./useGetParams";
import { NumStr, topicData, wordData } from "../Types/interfaces";
import { findElemByID } from "../Function/findElementByID";
import { shuffleArray } from "../Function/shufleArray";
import { SetStateAction, useEffect, useState } from "react";
import { topicsData } from "../JotaiData/jotaiData";

interface ItestData {
   isLoading: boolean;
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

interface IuseTestDataProps {
   updateIterableList?: boolean
}

function useTestData({ updateIterableList = false }: IuseTestDataProps = {}): ItestData {
   const [topicData, setTopicData] = useAtom<topicData[]>(topicsData)
   const [isLoadedFromStorage, setIsLoadedFromStorage] = useState(false);
   const [isLoading, setIsLoading] = useState(true)
   const sectionId = useGetParams(topicData)

   const [myIterableList, setMyIterableList] = useState<wordData[]>(
      []
   );

   useEffect(() => {
      if (!isLoadedFromStorage) {
         setIsLoadedFromStorage(true);
      } else {
         if (isLoading) {
            setIsLoading(false);

            if (topicData.length == 0) {
               throw new Error("Can't find data. 400 error");
            }

            setMyIterableList(shuffleArray(findElemByID<topicData>
               (topicData, sectionId).data)
               .sort((a, b) => a.rate > b.rate ? -1 : 1))
         }

         if (updateIterableList) {
            setMyIterableList(shuffleArray(findElemByID<topicData>
               (topicData, sectionId).data)
               .sort((a, b) => a.rate > b.rate ? -1 : 1))
         }
      }
   }, [topicData, isLoadedFromStorage, isLoading]);

   const { setNewParamInTopicData } = useChangeParamsInList();

   return {
      isLoading,
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
