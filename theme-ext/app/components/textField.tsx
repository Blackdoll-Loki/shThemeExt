import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

export default function TextFieldComponent() {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Name"
      value={value}
      onChange={handleChange}
      placeholder="Enter the offer name"
      autoComplete="off"
    />
  );
}