import { Box, InlineStack, Select, Text } from '@shopify/polaris';
import '../styles/widget.css';
import { useCallback, useState } from 'react';

interface WidgetProps {
  blocks: Array<{
    id: number;
    volume: number;
    discount: number;
    label: string;
    description: string;
  }>;
}

export default function WidgetComponent({ blocks }: WidgetProps){
  const [selected, setSelected] = useState('1');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const options = blocks.map((obj) => ({
    label: `${obj.volume}`,
    value: `${obj.volume}`,
  }));

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
          <div className='progress-bar'
             style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${blocks.length+1}, 1fr)`,
            }}
          >
            <div className='progress-bar-block'>Quantity {selected}</div>
            {blocks.map((obj)=>(
              <div className='progress-bar-block'>-{obj.discount}%</div>
          ))}
          </div>
          <table className='widget-table'>
            <thead>
              <tr className='table-row'>
                <th>Quantity</th>
                <th>Discount per item</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((obj)=>(
                <tr className='table-row'>
                  <td>{obj.volume}</td>
                  <td>-{obj.discount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Box>
  )
}