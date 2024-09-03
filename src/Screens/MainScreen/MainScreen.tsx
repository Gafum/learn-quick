import Card from "./Card/Card";
import styles from "./MainScreen.module.scss";
import ImgTag from "../../UI/CustomImage/CustomImageTag";
import { topicsData } from "../../jotaiData/jotaiData";
import { useAtom } from "jotai";
import { useCustomDialog } from "../../UI/CustomDialog/CustomDialog";
import DialogCreateNewSection from "./Dialogs/DialogCreateNewSection";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";

function MainScreen(): JSX.Element {
   const [topicList] = useAtom(topicsData)

   //Data for imported Components
   const [show, setShow] = useCustomDialog()


   return (<>
      {topicList.length == 0 ?
         (<div>
            Empty List
         </div>) :
         (<>
            <div className={styles.sectionName}>
               <span>Flashcard Categories</span>
               <CustomBtn>Filter</CustomBtn>
            </div>

            <div className={styles.flashcards}>
               {
                  topicList.map((element) => <Card key={element.id.toString()} data={element} />)
               }
            </div>
         </>
         )
      }
      <button className={styles.floatBtn} onClick={() => setShow(true)}>
         <ImgTag src="/plus.svg" style={{
            filter: "invert(1)"
         }} />
      </button >

      <DialogCreateNewSection show={show} setShow={setShow} title="Create New Section" />
   </>);
}

export default MainScreen;