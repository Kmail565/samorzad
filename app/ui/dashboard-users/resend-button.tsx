'use client'
import {User} from "next-auth";
import {createAccount, sendEmail} from "../../lib/registration";
import {useFormState} from "react-dom";

export default function ResendButton({user}: { user: User })
{
    return(
        <button onClick={
            ()=>
                sendEmail(user.email as string)
        }>
            Resend Button
        </button>
    )
}