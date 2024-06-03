'use client'
import {User} from "next-auth";
import {sendEmail} from "../../lib/registration";
import styles from "@/app/styles/user-table.module.scss";
import {useState} from "react";

export default function ResendButton({user}: { user: User })
{
    const [buttonState, setButtonState] = useState(false);

    const buttonClick = () => {
        setButtonState(true);
        sendEmail(user.email as string)
    }

    return(
        <button disabled={buttonState} onClick={buttonClick}  className={styles.button2}>
            Wyślij ponownie
        </button>
    )
}