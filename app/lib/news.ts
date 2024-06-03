'use server'
import {z} from "zod";
import {sql} from "@vercel/postgres";
import {redirect} from "next/navigation";
import {getSession} from "@/app/lib/actions";
import {News} from "@/app/lib/definitions";
import {unstable_noStore} from "next/cache";

const defaultNews: News = {
    id: "",
    user_id: "",
    title: "",
    text: "",
    date: "",
    modification_date: "",
    modified: false
}

async function idGetNews(id: string): Promise<News | undefined> {
    try {
        const news = await sql<News>`SELECT * FROM news WHERE id=${id}`;
        return news.rows[0];
    } catch (error) {
        // console.error('Database Error:', error);
        // throw new Error('Failed to fetch user.');
    }
}

export async function getNews(id: string): Promise<News> {
    unstable_noStore();
    const news = await idGetNews(id);
    if(!news) return defaultNews;
    return news;
}

export async function checkId(id:string): Promise<Boolean>
{
    unstable_noStore();
    const parsedId = z.string().safeParse(id);
    if(!parsedId.success) return false;
    const user = await idGetNews(parsedId.data);
    if(!user) return false;
    const session = await getSession();
    // @ts-ignore
    return session.user.id != parsedId.data;

}

export async function createNews(prevState: {error: undefined | string}, formData: FormData)
{
    const parsedTitle = z.string().min(1).safeParse(formData.get("title"));
    const parsedText = z.string().min(1).safeParse(formData.get("text"));

    if(parsedTitle.success && parsedText.success){

        const title = parsedTitle.data as string;
        const text = parsedText.data as string;
        const date = new Date().toISOString().split('T')[0];

        const session = await getSession();
        if(!session.user) return { error: 'Internal Server Error: Failed to create news' }
        try {
            await sql`
                INSERT INTO news (user_id, title, text, date, modification_date)
                VALUES (${session.user.id}, ${title}, ${text}, ${date}, ${date});
            `;
        }catch(error)
        {
            console.error(error);
            return {error: 'Database error',};
        }
        redirect("/dashboard/news");
    }else{
        return {error: "Wrong data"}
    }
}

export async function editNews(prevState: {error: undefined | string}, formData: FormData)
{
    const parsedId = z.string().safeParse(formData.get("id"));
    const parsedTitle = z.string().min(1).safeParse(formData.get("title"));
    const parsedText = z.string().min(1).safeParse(formData.get("text"));

    if(parsedId.success && parsedTitle.success && parsedText.success)
    {
        const id = parsedId.data as string;
        const title = parsedTitle.data as string;
        const text = parsedText.data as string;
        const date = new Date().toISOString().split('T')[0];

        try {
            await sql`
                UPDATE news
                SET title = ${title}, text = ${text}, modification_date = ${date}, modified = ${true}
                WHERE id = ${id}
            `;
        }catch(error)
        {
            console.error(error);
            return {error: 'Database error',};
        }
        redirect("/dashboard/news");
    }else{
        return {error: "Wrong data"}
    }
}

export async function deleteNews(formData: FormData)
{
    const parsedId = z.string().safeParse(formData.get("id"));
    const id = parsedId.data as string;

    try {
        await sql`
              DELETE FROM news
              WHERE id = ${id}
            `;
    } catch (error) {
        return { error: 'Database Error: Failed to delete User' };
    }

    redirect("/dashboard/news");
}