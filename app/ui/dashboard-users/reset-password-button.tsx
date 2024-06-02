'use client'
import {User} from "@/app/lib/definitions";
import {useState} from "react";
import {Modal} from "react-bootstrap";
import {resetPassword} from "@/app/lib/edit";
import styles from "@/app/styles/edit-user-form.module.scss";

export default function ResetPasswordButton({user}: { user: User })
{
    const [show,setShow] = useState(false);
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const generatePassword = () =>
    {
        let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let newPassword = "";

        for (let i = 0; i < 12; i++)
        {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
    }

    const copyToClipboard = () =>
    {
        const copiedPassword = document.createElement("textarea");
        copiedPassword.value = password;
        document.body.appendChild(copiedPassword);
        copiedPassword.select();
        document.execCommand("copy");
        document.body.removeChild(copiedPassword);
        setSuccessMessage("Password copied to clipboard!");
    };

    const resetPasswordAction = () =>
    {
        resetPassword(user.id, password);
        setShow(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
            <button className={styles.button3} onClick={handleShow} >
                Zresetuj hasło
            </button>
            <Modal show={show} onHide={handleShow}>
                <div className={styles.child}>
                    <h1 className={styles.h1}>Zresetuj hasło</h1>
                    <div>
                        <button className={styles.gen_button} onClick={generatePassword}>
                            Generuj nowe hasło
                        </button>
                        {password &&
                            <>
                                <div>
                                    {/*<label>Generated Password:</label>*/}
                                    <input className={styles.gen_pass}
                                           type="text" value={password} readOnly
                                    />
                                    <button className={styles.copy_button} onClick={copyToClipboard}>
                                        Copy
                                    </button>
                                    {successMessage && (
                                        <p>{successMessage}</p>
                                    )}
                                </div>
                                <button className={styles.close_button} onClick={handleClose}>Anuluj</button>
                                <button className={styles.con_button} onClick={resetPasswordAction}>
                                    Confirm Password
                                </button>
                            </>
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}