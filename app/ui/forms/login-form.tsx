'use client';
import { useFormState, useFormStatus } from 'react-dom';
import {login} from "@/app/lib/login";
import styles from "@/app/styles/login.module.css";
import React, { Component } from "react";
import * as url from "node:url";

export default function LoginForm()
{
    const [state, formAction] = useFormState<any,FormData>(login,undefined);
    return (
        <div>
            <form action={formAction}>

                    <div className={styles.bg}></div>
                    <div className={styles.child}>
                        <h1 className={styles.h1}>Samorząd Uczniowski XIV LO im. St. Staszica w Warszawie</h1>
                        <input className={styles.login_data + ' ' + styles.email}
                               type="email"
                               name="email"
                               placeholder="Podaj swój adres email"
                        />
                        <input className={styles.login_data + ' ' + styles.password}
                               type="password"
                               name="password"
                               placeholder="Podaj swoje hasło"
                        />
                        <div id={styles.error}>
                            {state?.error &&
                                <p>
                                    {state.error}
                                </p>
                            }
                        </div>
                        <div className={styles.forgot_pass}>
                            <a href={"url"}>Zapomniałeś hasła? Zresetuj je tutaj.</a>
                        </div>
                        <button className={styles.button}>
                            Zaloguj się
                        </button>
                    </div>

            </form>
        </div>
    )
        ;
}