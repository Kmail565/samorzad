'use client'
import {useFormState} from "react-dom";
import {createNews} from "@/app/lib/news";
import styles from "@/app/styles/news-create.module.css";

export default function NewsCreate() {
    const [state, formAction] = useFormState<any, FormData>(createNews, undefined);

    return(
        <form action={formAction} className={styles.child}>
            <input className={styles.title}
                type="text"
                name="title"
                placeholder="Tytuł"
            />
            <textarea className={styles.content}
                name="text"
                placeholder="Treść"
            />
            <button className={styles.button}>
                Wyślij
            </button>
            {state?.error &&
                <p>
                    {state.error}
                </p>
            }
        </form>
    )
}