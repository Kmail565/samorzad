'use client';
import {useFormState, useFormStatus} from 'react-dom';
import {register} from "../../lib/registration";

type Props = {
    params: {
        id: string;
    }
}

export default function RegisterForm({params} : Props)
{
    const [state, formAction] = useFormState<any,FormData>(register,undefined);
    const pending = useFormStatus().pending;
    return (
        <form action={formAction}>
            <input
                type="hidden"
                name="id"
                value={params.id}
            />
            <input
                type="name"
                name="name"
                minLength={1}
                placeholder="Enter your name"
            />
            <input
                type="text"
                name="surname"
                minLength={1}
                placeholder="Enter your surname"
            />
            <input
                type="password"
                name="password"
                minLength={6}
                placeholder="Enter your password"
            />
            <input
                type="password"
                name="repeated_password"
                minLength={6}
                placeholder="Repeat your password"
            />
            <button aria-disabled={pending}>
                Register
            </button>
            {state?.error &&
                <p>
                    {state.error}
                </p>
            }
        </form>
    );
}