'use client';
import { useFormState, useFormStatus } from 'react-dom';
import {login} from "../../lib/actions";
import {Simulate} from "react-dom/test-utils";
//import { authenticate } from "../lib/actions";

export default function LoginForm()
{
    const [state, formAction] = useFormState<any,FormData>(login,undefined);
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
            <button>
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