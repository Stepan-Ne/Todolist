import React, {ChangeEvent, useState} from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";


export default {
  title: 'Select',
  //component: Button,
  argTypes: {

  },
} as Meta;


export const ControlledSelect = () => {

  const [parentValue, setParentValue] = useState<undefined | string>("1");
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setParentValue(e.currentTarget.value);
  }
  return <select value={parentValue} onChange={onChange}>
    <option value="1">Moscow</option>
    <option value="2">Kiev</option>
    <option value="3">Minsk</option>
    <option value="3">St-Petersburg</option>
  </select>
}