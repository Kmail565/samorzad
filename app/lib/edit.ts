'use server'
import {z} from "zod";
import bcrypt from "bcrypt";
import {redirect} from "next/navigation";
import {sql} from "@vercel/postgres";
import {getSession} from "@/app/lib/actions";

export async function editNames(formData: FormData)
{
    const parsedName = z.string().min(1).safeParse(formData.get("name"));
    const parsedSurname = z.string().min(1).safeParse(formData.get("surname"));

    if(parsedName.success && parsedSurname.success)
    {
        const name = parsedName.data as string;
        const surname = parsedSurname.data as string;

        const session = await getSession();

        try {
            await sql`
              UPDATE users
              SET name = ${name}, surname = ${surname}
              WHERE id = ${session.user?.id}
            `;
        } catch (error) {
            return { error: 'Database Error: Failed to Update User' };
        }
    }
    return {error: "Invalid data"};
}