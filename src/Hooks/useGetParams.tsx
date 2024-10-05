import { useParams } from "react-router-dom";
import { findIndexOfELement } from "../Function/findElementByID";
import { NumStr, topicData } from "../Types/interfaces";

function useGetParams(topicData: topicData[]): NumStr {
   const { sectionId } = useParams()
   if (!sectionId) { throw new Error("not found sectionId parameter") }
   if (!(findIndexOfELement(topicData, sectionId) + 1)) throw new Error("404 page not found");

   return (sectionId);
}

export default useGetParams;