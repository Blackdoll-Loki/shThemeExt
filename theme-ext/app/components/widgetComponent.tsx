import { BlockStack, Box, InlineStack, Select, Text } from '@shopify/polaris';
import '../styles/widget.css';
import { useCallback, useState } from 'react';

export default function WidgetComponent(){
  const [selected, setSelected] = useState('1');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const options = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
  ];
  return(
    <Box>
      <InlineStack align="space-between">
        <Text variant="headingMd" as="h6">
          Widget preview
        </Text>
        <Box width='150px'>
          <Select
            label=""
            options={options}
            onChange={handleSelectChange}
            value={selected}
          />
        </Box>
      </InlineStack>
      <section>
        <div className='text-block'>
          <h2>savings Chart</h2>
          <p>* 0 in cart</p>
        </div>
        <div className='progress-bar'></div>
        <table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Discount per item</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3</td>
              <td>-5</td>
            </tr>
            <tr>
              <td>5</td>
              <td>-10</td>
            </tr>
            <tr>
              <td>10</td>
              <td>-15</td>
            </tr>
          </tbody>
        </table>
      </section>
    </Box>
  )
}