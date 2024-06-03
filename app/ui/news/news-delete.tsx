'use client'
import {News} from "@/app/lib/definitions";
import styles from "@/app/styles/user-table.module.scss";
import {useState} from "react";
import {Modal} from "react-bootstrap";
import {deleteNews} from "@/app/lib/news";

type Props = {
    news: News
}

export default function NewsDelete({news} : Props)
{
    const [show,setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
            <button type={"button"} className={styles.button2} onClick={handleShow}>
                Usuń post
            </button>
            <Modal show={show} onHide={handleShow}>
                <div className={styles.child2}>
                    <h2 className={styles.h2}>Czy jesteś pewien że chcesz usunąć ten post?</h2>
                    <div>
                        <form action={deleteNews}>
                            <input type="hidden" name="id" value={news.id}/>
                            <button className={styles.com_button1} onClick={handleClose}>Potwierdź</button>
                        </form>
                        <button className={styles.com_button2} onClick={handleClose}>Anuluj</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}