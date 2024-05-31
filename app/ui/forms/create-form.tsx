'use client'
import {createAccount, register} from "../../lib/registration";
import {useFormState, useFormStatus} from "react-dom";

export default function CreateForm()
{
    const [state, formAction] = useFormState<any,FormData>(createAccount,undefined);
    const pending = useFormStatus().pending;
    return(
        <form action={formAction}>
            <input
                name='email'
                type='email'
                placeholder='Enter your email address'
            />
            <select name='permission' defaultValue="">
                <option value='' disabled>Select permission</option>
                <option>MODERATOR</option>
            </select>
            <button>Register</button>
            {state?.error &&
                <p>
                    {state.error}
                </p>
            }
        </form>
    )
}