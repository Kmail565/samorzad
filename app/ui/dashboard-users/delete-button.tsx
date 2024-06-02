'use client'
import {User} from "@/app/lib/definitions";
import {useState} from "react";
import {Modal} from "react-bootstrap";
import {deleteUser} from "@/app/lib/edit";
import styles from "@/app/styles/edit-user-form.module.scss";

export default function DeleteButton({user}: { user: User })
{
    const [show,setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
            <button className={styles.button2} onClick={handleShow}>
                Usuń konto
            </button>
            <Modal show={show} onHide={handleShow}>
                <div className={styles.child}>
                    <h2 className={styles.h1}>Czy jesteś pewien że chcesz usunąć konto: {user.email}</h2>
                    <div>
                        <form action={deleteUser}>
                            <input type="hidden" name="id" value={user.id}/>
                            <button className={styles.com_button1} onClick={handleClose}>Potwierdź</button>
                        </form>
                        <button className={styles.com_button2} onClick={handleClose}>Anuluj</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}