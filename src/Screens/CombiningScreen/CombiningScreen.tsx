import { useEffect, useState } from "react";
import useTestData from "../../Hooks/useTestData";
import { shuffleArray } from "../../Function/shufleArray";

function CombiningScreen(): JSX.Element {
   const { myIterableList } = useTestData()
   const [chooseList, setChooseList] = useState(myIterableList)


   function startTest() {
      setChooseList(shuffleArray(myIterableList))
   }

   useEffect(() => {
      startTest()
   }, [])

   return (
      <div style={{ display: "flex", gap: "10px" }}>
         <div>
            {
               myIterableList.map((elem) => {
                  return (
                     <div>
                        {elem.word}
                     </div>
                  )
               })
            }
         </div>
         <div>
            {
               chooseList.map((elem) => {
                  return (
                     <div>
                        {elem.meaning}
                     </div>
                  )
               })
            }
         </div>
      </div>
   );
}

export default CombiningScreen;