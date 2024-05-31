import styles from "@/app/styles/home.module.css";
import Accordion from 'react-bootstrap/Accordion';
import {AccordionBody, AccordionHeader, AccordionItem} from "react-bootstrap";

export default function Home() {
    return (
        <div className={styles.acc}>
            <h1 className={styles.title}>Strona główna</h1>
            <Accordion defaultActiveKey="0">
                <AccordionItem eventKey="0">
                    <AccordionHeader>Accordion Item #1</AccordionHeader>
                    <AccordionBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem eventKey="1">
                    <AccordionHeader>Accordion Item #2</AccordionHeader>
                    <AccordionBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
