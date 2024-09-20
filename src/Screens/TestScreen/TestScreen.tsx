import { useEffect, useState } from "react";
import { shuffleArray } from "../../Function/shufleArray";
import useTestData from "../../Hooks/useTestData";
import TestScreenComponent from "./TestScreenComponent";
import { findElemByID } from "../../Function/findElementByID";


function TestScreen(): JSX.Element {
   const {
      topicData,
      setNewParamInTopicData,
      sectionId,
      myIterableList,
      setMyIterableList,
      reduceRate
   } = useTestData()


   //Test Data
   const [testNumber, setTestNumber] = useState(0)
   const [score, setScore] = useState(0)
   const [isFinished, setIsFinished] = useState(false)


   useEffect(() => {
      startTest();
   }, [])

   function startTest() {
      setMyIterableList(() => {
         return shuffleArray(
            findElemByID(topicData, sectionId).data
         ).sort((a, b) => a.rate > b.rate ? -1 : 1)
      }
      )
      setTestNumber(0)
      setIsFinished(false)
      setScore(0)
   }

   function nextTest(isRignt: boolean) {
      if (isRignt) {
         setScore(prev => prev + 1)
         reduceRate(myIterableList[testNumber].id)
      } else {
         setNewParamInTopicData({
            id: myIterableList[testNumber].id,
            param: "rate",
            newData: 10
         })
      }

      if (testNumber >= myIterableList.length - 1) {
         setIsFinished(true)
         return;
      }

      setTestNumber(prev => prev + 1)
   }


   return (
      <TestScreenComponent
         {...{
            myIterableList,
            isFinished,
            score,
            testNumber,
            startTest,
            nextTest
         }}
      />
   )
}

export default TestScreen;