'use client'
import {User} from "next-auth";
import {createAccount, sendEmail} from "../../lib/registration";
import {useFormState} from "react-dom";
import styles from "@/app/styles/user-table.module.scss";

export default function ResendButton({user}: { user: User })
{
    return(
        <button onClick={()=>sendEmail(user.email as string)}  className={styles.button2}>
            Resend Button
        </button>
    )
}