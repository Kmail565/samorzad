import Link from "next/link";
import NewsTable from "@/app/ui/news/news-table";
import styles from "@/app/styles/newspage.module.scss";
import {Suspense} from "react";

export default function News()
{
    return(
        <div className={styles.child}>
            <h1 className={styles.h1}>Aktualności</h1>
            <Link href={"/dashboard/news/create"}><button className={styles.button}>Utwórz nowy post</button></Link>
            <Suspense fallback={<div>Loading...</div>}>
                <NewsTable display={true}/>
            </Suspense>
        </div>
    )
}