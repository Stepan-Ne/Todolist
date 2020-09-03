import React, {useState} from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import './App.css';
import {action} from "@storybook/addon-actions";



export default {
  title: 'Todolist',
  component: Todolist,
  argTypes: {
  },
} as Meta;
const arr = [{id: v1(), title: 'JS', isDone: true},
  {id: v1(), title: 'React', isDone: false}]
export const Todolist1 = () => <Todolist title={"I Learn"} task={arr} removeTask={x=>x} changeFilter={() => {}} addTask={action("add task")} changeTaskStatus={() => {}} filter={"all"}/>
export const Todolist2 = () => <Todolist title={"We Learn"} task={arr} removeTask={() => {}} changeFilter={() => {}} addTask={() => {}} changeTaskStatus={() => {}} filter={"active"}/>


// const Template: Story<ButtonProps> = (args) => <Button {...args} />;
//
// export const Primary = Template.bind({});
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };
//
// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };
//
// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };
//
// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
