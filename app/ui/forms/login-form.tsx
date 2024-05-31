'use client';
import { useFormState, useFormStatus } from 'react-dom';
import {login} from "../../lib/actions";
import styles from "@/app/styles/login.module.css";

export default function LoginForm()
{
    const [state, formAction] = useFormState<any,FormData>(login,undefined);
    return (
        <div>
            <div className={styles.parent}></div>
            <form action={formAction}>
                <div className={styles.child}>
                    <h1 className={styles.h1}>Samorząd Uczniowski XIV LO im. St. Staszica w Warszawie</h1>
                    <input className={styles.login_data + ' ' + styles.email}
                           type="email"
                           name="email"
                           placeholder="Enter your email address"
                    />
                    <input className={styles.login_data + ' ' + styles.password}
                           type="password"
                           name="password"
                           placeholder="Enter your password"
                    />
                    <div id={styles.error}>
                        {state?.error &&
                            <p>
                                {state.error}
                            </p>
                        }
                    </div>
                    <div className={styles.forgot_pass}>
                        <a href={"url"}>Forgotten password? Click here to reset.</a>
                    </div>
                    <button className={styles.button}>
                        Log in
                    </button>
                </div>

            </form>
        </div>
)
    ;
}