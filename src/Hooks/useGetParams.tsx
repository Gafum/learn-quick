import { useParams } from "react-router-dom";
import { findIndexOfELement } from "../Function_temp/findElementByID";

import { NumStr, topicData } from "../Types_temp/interfaces";

function useGetParams(topicData: topicData[]): NumStr {
   const { sectionId } = useParams()
   if (!sectionId) throw new Error("not found")
   if (!(findIndexOfELement(topicData, sectionId) + 1)) throw new Error("404 page not found");

   return (sectionId);
}

export default useGetParams;