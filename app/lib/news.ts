'use server'
import {z} from "zod";
import {sql} from "@vercel/postgres";
import {redirect} from "next/navigation";
import {getSession} from "@/app/lib/actions";

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