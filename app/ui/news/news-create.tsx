'use client'
import {useFormState} from "react-dom";
import {createNews} from "@/app/lib/news";

export default function NewsCreate() {
    const [state, formAction] = useFormState<any, FormData>(createNews, undefined);

    return(
        <form action={formAction}>
            <input
                type="text"
                name="title"
                placeholder="Title"
            />
            <textarea
                name="text"
            />
            <button>
                Submit
            </button>
            {state?.error &&
                <p>
                    {state.error}
                </p>
            }
        </form>
    )
}