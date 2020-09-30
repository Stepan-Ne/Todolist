import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string) => void
}


export function AddItemForm(props: AddItemFormType) {
    //Local state for input
    const [title, setTitle] = useState("");
    //State for error
    const [error, setError] = useState<"Field is required" | "">("");
    //OnKeyPressHandler
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };
    //OnChangeHandler
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("");
        setTitle(e.currentTarget.value);
    };
    //addTask
    const addTask = () => {
        if (title.trim() === "") {
            setError("Field is required");
            return
        }
        props.addItem(title.trim());
        setError("");
        setTitle("");
    };
    return (
        <div>
            <input type="text" value={title}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}