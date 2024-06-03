import NewsCreate from "@/app/ui/news/news-create";
import styles from "@/app/styles/createpage.module.css";

export default function CreateNewsPage()
{
    return(
        <div className={styles.child}>
            <h1 className={styles.h1}>Utwórz nowy post</h1>
            <NewsCreate/>
        </div>
    )
}