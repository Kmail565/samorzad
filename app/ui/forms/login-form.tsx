'use client';
import {useFormState, useFormStatus} from 'react-dom';
import {login} from "../../lib/actions";

export default function LoginForm()
{
    const [state, formAction] = useFormState<any,FormData>(login,undefined);
    const pending = useFormStatus().pending;
    return (
        <form action={formAction}>
            <input
                type="email"
                name="email"
                placeholder="Enter your email address"
            />
            <input
                type="password"
                name="password"

                placeholder="Enter your password"
            />
            <button aria-disabled={pending}>
                Log in
            </button>
            {state?.error &&
                <p>
                    {state.error}
                </p>
            }
        </form>
    );
}