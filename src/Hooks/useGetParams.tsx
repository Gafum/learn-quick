import { useParams } from "react-router-dom";
import { findIndexOfELement } from "../Function/findElementByID";
import { NumStr, ITopicData } from "../Types/interfaces";
import errorRedirect from "../Function/errorRedirect";

function useGetParams(ITopicData: ITopicData[]): NumStr {
   const { sectionId } = useParams();

   if (!sectionId) {
      throw errorRedirect("not found sectionId parameter");
   }

   if (!(findIndexOfELement(ITopicData, sectionId) + 1)) {
      throw errorRedirect("404 page not found");
   }

   return sectionId;
}

export default useGetParams;
