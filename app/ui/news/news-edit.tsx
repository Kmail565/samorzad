'use client'
import {useFormState} from "react-dom";
import {editNews} from "@/app/lib/news";
import styles from "@/app/styles/news-create.module.css";
import {News} from "@/app/lib/definitions";
import NewsDelete from "@/app/ui/news/news-delete";

type Props = {
    news: News
}

export default function NewsEdit({news} : Props){
    const [state, formAction] = useFormState<any, FormData>(editNews, undefined);

    return(
        <form action={formAction} className={styles.child}>
            <input className={styles.title} name="id" value={news.id} hidden={true}/>
            <input className={styles.title}
                   type="text"
                   name="title"
                   defaultValue={news.title}
                   placeholder="Tytuł"
            />
            <textarea className={styles.content}
                      name="text"
                      defaultValue={news.text}
                      placeholder="Treść"
            />
            <div className={styles.buttons_wrapper}>
                <button className={styles.button}>
                    Zapisz zmiany
                </button>
                <NewsDelete news={news}/>
            </div>
            {state?.error &&
                <p>
                    {state.error}
                </p>
            }
        </form>
    )
}