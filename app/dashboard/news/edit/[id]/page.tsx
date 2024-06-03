import styles from "@/app/styles/createpage.module.css";
import NewsEdit from "@/app/ui/news/news-edit";
import {checkId, getNews} from "@/app/lib/news";
import {redirect} from "next/navigation";

type Props = {
    params: {
        id: string;
    }
}

export default async function EditNewsPage({params} : Props)
{
    const news = await getNews(params.id);
    const correctId = await checkId(params.id);
    if(!correctId) redirect("/dashboard/news/edit");
    return(
        <div className={styles.child}>
            <h1 className={styles.h1}>Edytuj post</h1>
            <NewsEdit news={news}/>
        </div>
    )
}