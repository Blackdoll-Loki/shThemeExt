import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {optionCreator, type SelectOptionCreatorProps} from '../utils/optionsCreator';

interface selectProps extends SelectOptionCreatorProps{
  label: string;
}

export default function SelectExample(props:selectProps) {
  const [selected, setSelected] = useState('1');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  // const options = [
  //   {label: '1', value: '1'},
  //   {label: '5', value: '5'},
  //   {label: '10', value: '10'},
  // ];
  const options = optionCreator(props.min, props.max, props.step, props.str);

  return (
    <Select
      label={props.label}
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}