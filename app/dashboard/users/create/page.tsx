import Link from "next/link";
import CreateForm from "../../../ui/forms/create-form";
import styles from "@/app/styles/create.module.css";


export default function RegisterPage()
{
    return(
        <>
            <h1 className={styles.wpisywanie_maila} >Create</h1>

            <CreateForm/>
        </>
    )
}
