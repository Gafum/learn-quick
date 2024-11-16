import { domAnimation, LazyMotion, m } from "framer-motion";
import styles from "./About.module.scss";
import { ScreensAnimation } from "../../CustomData/animation";

function About(): JSX.Element {
   return (
      <LazyMotion features={domAnimation}>
         <m.div {...ScreensAnimation} className={styles.aboutPage}>
            <h2>About Learn Quick</h2>
            <p>
               Learn Quick is a comprehensive web application designed to help
               users improve their vocabulary through engaging and interactive
               tools. The platform is built around the concept of flashcards and
               quizzes, providing a personalized learning experience that adapts
               to each user's needs. Whether you're preparing for an exam,
               learning a new language, or simply expanding your vocabulary,
               Learn Quick offers a variety of exercises to make the learning
               process effective and enjoyable.
            </p>
            <p>
               One of the key features of Learn Quick is the ability to create
               custom categories, allowing you to organize your vocabulary based
               on themes, subjects, or personal goals. Each category can contain
               flashcards, which include a word on the front and its definition
               or an image on the back, helping you associate concepts visually.
            </p>
            <p>
               Also you can add flashcards to your favorites to focus on
               challenging words. Favorited words will appear more frequently
               during quizzes and exercises, allowing you to concentrate on
               vocabulary that needs extra attention.
            </p>

            <h2>Tests</h2>
            <ul>
               <li>
                  <strong>Flashcards</strong>: Create and review flashcards in
                  custom categories. Each flashcard has a front with a word or
                  term and a back with its meaning or an illustrative image.
                  These flashcards are a core part of the learning process,
                  making it easy to review and memorize new words.
               </li>
               <li>
                  <strong>Multiple-Choice Test</strong>: Test your knowledge by
                  taking a quiz where each question presents a word, and you
                  must choose the correct definition from four options. If you
                  answer correctly, your score will increase. If the answer is
                  incorrect, the correct definition will be shown, allowing you
                  to learn from your mistake while continuing the quiz.
               </li>
               <li>
                  <strong>Writing Test</strong>: Practice your spelling and
                  precise recall by typing the correct answer for each word
                  shown. If you make a mistake, the correct answer will be
                  revealed, and you have the option to restart the test to try
                  again.
               </li>
               <li>
                  <strong>Combination Test</strong>: Match words with their
                  definitions in a drag-and-drop style exercise. This test
                  challenges your ability to associate vocabulary terms quickly
                  and accurately, enhancing memory retention.
               </li>
            </ul>

            <h2>Shortcuts</h2>
            <ul className={styles.shortcutsList}>
               <li>
                  <h3>Flashcards</h3>
               </li>
               <li>
                  <p>
                     <strong>Enter</strong> or <strong>Right Arrow</strong>: Go
                     to the next card in Flashcards.
                  </p>
               </li>
               <li>
                  <p>
                     <strong>Left Arrow</strong>: Go to the previous card in
                     Flashcards.
                  </p>
               </li>
               <li>
                  <p>
                     <strong>Spacebar</strong>: Flip the current card.
                  </p>
               </li>
               <li>
                  <h3>Test</h3>
               </li>
               <li>
                  <p>
                     <strong>1, 2, 3, 4</strong>: Select corresponding answers
                     in tests.
                  </p>
               </li>
               <li>
                  <p>
                     <strong>Enter</strong>: Repeat test in Writing and Standard
                     Test.
                  </p>
               </li>
            </ul>

            <h2>Developer</h2>
            <ul className={styles.linkList}>
               <li>
                  <a href="https://github.com/Gafum">GitHub</a>
               </li>
               <li>
                  <a href="https://www.youtube.com/@gafum">YouTube</a>
               </li>
               <li>
                  <a href="https://play.google.com/store/apps/dev?id=5298640550031789087&gl=DE">
                     Google Play
                  </a>
               </li>
            </ul>
         </m.div>
      </LazyMotion>
   );
}

export default About;
