'use server'
import {z} from "zod";
import {sql} from "@vercel/postgres";
import {User} from "./definitions";
import {redirect} from "next/navigation";
import bcrypt from "bcrypt";
import {logout} from "./login";
import {unstable_noStore} from "next/cache";
import sgMail from "@sendgrid/mail";

const defaultUser: {name:string, surname: string, password: string, image_url: string} = {
    name: "BRAK",
    surname: "BRAK",
    password: "BRAK",
    image_url: "/default.jpg"
}

const msgTemplate = {
    from: 'strona.staszic.xiv.samorzad@gmail.com',
    subject: 'Account registration',
    text: 'Account registration link: http://localhost:3000/register/'
}

async function emailGetUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function sendEmail(email: string) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const user = await emailGetUser(email);

    const msg = {
        from: msgTemplate.from,
        to: email,
        subject: msgTemplate.subject,
        text: msgTemplate.text + user?.id,
    }

    sgMail.send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error: any) => {
        console.error(error);
    })
}

export async function createAccount(prevState: {error: undefined | string}, formData: FormData)
{
    const parsedEmail = z.string().email().safeParse(formData.get("email"));
    const parsedPermission = z.enum(['MODERATOR']).safeParse(formData.get("permission"));

    if(!parsedEmail.success || !parsedPermission.success)
    {
        return {error: 'Missing Fields. Failed to Create Account.',};
    }

    const email = parsedEmail.data as string;
    const permission = parsedPermission.data;
    const date = new Date().toISOString().split('T')[0];

    const isUser = await emailGetUser(email);
    if(isUser) return {error: 'Email already in use',};

    try {
        await sql`
                INSERT INTO users (name, surname, email, password, permission, image_url, date)
                VALUES (${defaultUser.name}, ${defaultUser.surname}, ${email}, ${defaultUser.password}, 
                ${permission}, ${defaultUser.image_url}, ${date});
        `;
    }catch(error)
    {
        return {error: 'Database error',};
    }

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const user = await emailGetUser(email);

    const msg = {
        from: msgTemplate.from,
        to: email,
        subject: msgTemplate.subject,
        text: msgTemplate.text + user?.id,
    }

    sendEmail(email);

    redirect("/dashboard/users");
}

async function idGetUser(id: string): Promise<User | undefined>
{
    try {
        const user = await sql<User>`SELECT * FROM users WHERE id=${id}`;
        return user.rows[0];
    } catch (error) {
        // console.error('Database Error:', error);
        // throw new Error('Failed to fetch user.');
    }
}

export async function checkId(id:string): Promise<Boolean>
{
    unstable_noStore();
    const parsedId = z.string().safeParse(id);
    if(!parsedId.success) return false;
    const user = await idGetUser(parsedId.data);
    if(!user) return false;
    if(user.registered) return false;
    return true;
}

export async function register(prevState: {error: undefined | string}, formData: FormData)
{
    const parsedId = z.string().safeParse(formData.get("id"));
    const parsedName = z.string().min(1).safeParse(formData.get("name"));
    const parsedSurname = z.string().min(1).safeParse(formData.get("surname"));
    const parsedPassword = z.string().safeParse(formData.get("password"));
    const parsedRepeatedPassword = z.string().safeParse(formData.get("repeated_password"));

    if(!parsedName.success || !parsedSurname.success || !parsedPassword.success || !parsedRepeatedPassword.success)
    {
        return {error: "Invalid data"};
    }

    const id = parsedId.data;
    const name = parsedName.data;
    const surname = parsedSurname.data;
    const password = parsedPassword.data;
    const repeatedPassword = parsedRepeatedPassword.data;

    if(password != repeatedPassword)
    {
        return {error: "Passwords are not the same"};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await sql`
          UPDATE users
          SET name = ${name}, surname = ${surname}, password = ${hashedPassword}, registered = true
          WHERE id = ${id}
        `;
    } catch (error) {
        return { error: 'Database Error: Failed to Register' };
    }
    logout();
    redirect("/login");
}