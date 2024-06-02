import {fetchNews} from "@/app/lib/data";
import Accordion from 'react-bootstrap/Accordion';
import {AccordionBody, AccordionHeader, AccordionItem} from "react-bootstrap";
import styles from "@/app/styles/news-table.module.css";


export default async function NewsTable() {
    const newsList = await fetchNews();

    return(
        <div className={styles.acc}>
            {newsList.map((post, index) => (
                <div key={post.id}>
                    <Accordion defaultActiveKey="{index}">
                        <AccordionItem eventKey="0">
                            <AccordionHeader className={styles.title}><h2 className={styles.title}>{post.title}</h2></AccordionHeader>
                            <AccordionBody>
                                <p className={styles.content}>{post.text}</p>
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </div>
    )
}