import React, {ChangeEvent, useState} from "react";


type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    return editMode
        ? <input onBlur={activateViewMode}
                 onChange={onChangeInputHandler}
                 value={title} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}

export default EditableSpan;