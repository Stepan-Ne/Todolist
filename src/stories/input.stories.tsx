import React, {ChangeEvent, useState} from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";


export default {
  title: 'Input',
  //component: Button,
  argTypes: {

  },
} as Meta;


export const UncontrolledInput = () => <input/>
export const TrakingValueOfUncontrolledInput = () => {

  const [value, setValue] = useState("");
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let actualValue = event.currentTarget.value;
    setValue(actualValue);
  }
  return <><input onChange={onChangeHandler}/> - {value}</>
}
export const ControlledInput = () => {

  const [parentValue, setParentValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParentValue(e.currentTarget.value);
  }
  return <input value={parentValue} onChange={onChange}/>
}