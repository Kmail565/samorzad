import {fetchNews, formatDateToLocal} from "@/app/lib/data";
import Accordion from 'react-bootstrap/Accordion';
import {AccordionBody, AccordionHeader, AccordionItem} from "react-bootstrap";
import styles from "@/app/styles/news-table.module.css";
import EditNewsButton from "@/app/ui/news/edit-news-button";

type Props = {
    display: boolean;
}

export default async function NewsTable({display} : Props) {
    const newsList = await fetchNews();

    return(
        <div className={styles.acc}>
            {newsList.map((post, index) => (
                <div key={post.id}>
                    <Accordion defaultActiveKey="{index}">
                        <AccordionItem eventKey="0">
                            <div className={styles.header}>
                                <AccordionHeader className={styles.title}>
                                    <h2>
                                        {index+1}. {post.title}
                                    </h2>
                                    {post.modified && <p className={styles.modified}>Edytowany</p>}
                                </AccordionHeader>
                                <div hidden={!display} className={styles.edit_news_button}>
                                    <EditNewsButton news={post}/>
                                </div>
                            </div>
                            <AccordionBody>
                                <p>
                                    {formatDateToLocal(post.date)}
                                    &#160;
                                    {post.modified && <>- Edytowano {formatDateToLocal(post.modification_date)}</>}
                                </p>

                                <p className={styles.content}>
                                    {post.text}
                                </p>
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </div>
    )
}