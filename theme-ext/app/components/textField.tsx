import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface FunnelnameProps{
  funnelName: string
  onUpdate:(newName: string)=> void
}

export default function TextFieldComponent(props: FunnelnameProps) {

  const handleChange = useCallback(
    (newValue: string) => props.onUpdate(newValue),
    [props]
  );

  return (
    <TextField
      label="Name"
      value={props.funnelName}
      onChange={handleChange}
      placeholder="Enter the offer name"
      autoComplete="off"
    />
  );
}