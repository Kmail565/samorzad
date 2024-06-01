'use client';
import {useFormState, useFormStatus} from 'react-dom';
import {register} from "../../lib/registration";
import styles from "@/app/styles/login.module.css";

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
        <div>
            <div className={styles.parent}></div>
            <form action={formAction}>
                <div className={styles.child2}>
                    <h1 className={styles.h1}>Samorząd Uczniowski XIV LO im. St. Staszica w Warszawie</h1>
                    <input
                        type="hidden"
                        name="id"
                        value={params.id}
                    />
                    <input className={styles.login_data + ' ' + styles.email}
                           type="name"
                           name="name"
                           minLength={1}
                           placeholder="Podaj swoje imię"
                    />
                    <input className={styles.login_data + ' ' + styles.email}
                           type="text"
                           name="surname"
                           minLength={1}
                           placeholder="Podaj swoje nazwisko"
                    />
                    <input className={styles.login_data + ' ' + styles.email}
                           type="password"
                           name="password"
                           minLength={6}
                           placeholder="Utwórz swoje hasło"
                    />
                    <input className={styles.login_data + ' ' + styles.password}
                           type="password"
                           name="repeated_password"
                           minLength={6}
                           placeholder="Powtórz swoje hasło"
                    />
                    <button aria-disabled={pending}  className={styles.button2}>
                        Register
                    </button>
                    {state?.error &&
                        <p>
                            {state.error}
                        </p>
                    }
                </div>
            </form>
        </div>
    );
}