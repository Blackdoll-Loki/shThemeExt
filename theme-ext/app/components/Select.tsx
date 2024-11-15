import {Select} from '@shopify/polaris';
import {useState, useCallback, Fragment} from 'react';
import {optionCreator, type SelectOptionCreatorProps} from '../utils/optionsCreator';

interface SelectProps extends SelectOptionCreatorProps {
  defaultValue: string;
}

export default function SelectExample(props:SelectProps) {
  const [selected, setSelected] = useState(props.defaultValue);

  const handleSelectChange = useCallback(
    (selected: string) => setSelected(selected),
    [],
  );

  const options = optionCreator(props.min, props.max, props.step, props.str);

  return (
    <Fragment>
      <Select
        label=''
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
    </Fragment>
  );
}