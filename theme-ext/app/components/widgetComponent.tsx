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
      <section className='widget-section'>
        <div className='widget-content'>
          <div className='text-block'>
            <h2 className='widget-title'>Savings Chart</h2>
            <p className='widget-title'>* 0 in cart</p>
          </div>
          <div className='progress-bar'>
            <div className='progress-bar-block'>Quantity 1</div>
            <div className='progress-bar-block progress-bar-block_active'>-5%</div>
            <div className='progress-bar-block'>-10%</div>
            <div className='progress-bar-block'>-15%</div>
          </div>
          <table className='widget-table'>
            <thead>
              <tr className='table-row'>
                <th>Quantity</th>
                <th>Discount per item</th>
              </tr>
            </thead>
            <tbody>
              <tr className='table-row'>
                <td>3</td>
                <td>-5</td>
              </tr>
              <tr className='table-row'>
                <td>5</td>
                <td>-10</td>
              </tr>
              <tr className='table-row'>
                <td>10</td>
                <td>-15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </Box>
  )
}