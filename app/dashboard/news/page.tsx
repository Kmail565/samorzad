import Link from "next/link";
import NewsTable from "@/app/ui/news/news-table";
import LatestNews from "@/app/ui/news/latest-news";

export default function News()
{
    return(
        <>
            <h1>Edit news</h1>
            <Link href={"/dashboard/news/create"}>Create news</Link>
            <NewsTable/>
            <LatestNews/>
        </>
    )
}