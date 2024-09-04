import Card from "./Card/Card";
import styles from "./MainScreen.module.scss";
import ImgTag from "../../UI/CustomImage/CustomImageTag";
import { topicsData } from "../../jotaiData/jotaiData";
import { useAtom } from "jotai";
import { useCustomDialog } from "../../UI/CustomDialog/CustomDialog";
import DialogCreateNewSection from "./Dialogs/DialogCreateNewSection";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import { filterList } from "./MyFunction/sortFilter";
import DialogFilter from "./Dialogs/DialogFilter";

function MainScreen(): JSX.Element {
   const [topicList] = useAtom(topicsData)

   //Data for imported Components
   const [showAddSection, setShowAddSection] = useCustomDialog()
   const [showFilterModule, setShowFilterModule] = useCustomDialog()

   return (<>
      {topicList.length == 0 ?
         (<div>
            Empty List
         </div>) :
         (<>
            <div className={styles.sectionName}>
               <span>Flashcard Categories</span>
               <CustomBtn onClick={() => setShowFilterModule(true)}>Filter</CustomBtn>
            </div>

            <div className={styles.flashcards}>
               {
                  filterList(topicList, { parameter: "name" }).map((element) => <Card key={element.id.toString()} data={element} />)
               }
            </div>
         </>
         )
      }

      <button className={styles.floatBtn} onClick={() => setShowAddSection(true)}>
         <ImgTag src="/plus.svg" style={{
            filter: "invert(1)"
         }} />
      </button >

      <DialogCreateNewSection show={showAddSection} setShow={setShowAddSection} title="Create New Section" />
      <DialogFilter show={showFilterModule} setShow={setShowFilterModule} title="Select Filter" />

   </>);
}

export default MainScreen;