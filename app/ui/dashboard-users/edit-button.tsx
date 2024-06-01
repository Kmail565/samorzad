'use client'
import {User} from "next-auth";
import styles from "@/app/styles/user-table.module.scss";

export default function EditButton({user}: { user: User })
{
    return(
        <button className={styles.button}>
            Edit user
        </button>
    )
}