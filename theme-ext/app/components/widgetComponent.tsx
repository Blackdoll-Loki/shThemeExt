import { Box, InlineStack, Select, Text } from '@shopify/polaris';
import '../styles/widget.css';
import { useCallback, useMemo, useState } from 'react';

interface WidgetProps {
  blocks: Array<Block>;
}
interface Block {
  id: number;
  volume: number;
  discount: number;
  label: string;
  description: string;
}

export default function WidgetComponent({ blocks }: WidgetProps){
  const [selected, setSelected] = useState('1');
  const progressBarStyles = useMemo(() => getProgressBarStyles(blocks, selected), [blocks, selected]);


  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  function createOptions(){
    const options = [];

    const theBiggestDiscountOption = blocks.reduce((acc, cur)=>{
      if(cur.discount > acc){
        acc = cur.discount;
      }
      return acc;
    }, 0)
    for(let i  = 1; i <= theBiggestDiscountOption; i++){
      options.push({
          label: `${i}`,
          value: `${i}`,
        })
    }
    return options
  }
  const options = createOptions();

  function getProgressBarStyles(arr: Block[], selected: string) {
    const volumes = arr.map((obj) => obj.volume);
    let remaining = Number(selected); // Поточне значення selected
    const styles = volumes.map((volume, index) => {
      if (remaining <= 0) {
        // Якщо значення selected вже вичерпане, всі наступні блоки будуть білими
        return { background: 'white' };
      }
  
      if (remaining >= volume) {
        // Якщо залишок більше або дорівнює поточному volume, зафарбувати повністю
        remaining -= volume; // Віднімаємо об'єм поточного блоку
        return { background: 'rgb(160, 159, 243)' };
      } else {
        // Якщо залишок менший за поточний volume, додати градієнт
        const percentColored = Math.round((remaining / volume) * 100);
        console.log(`percentColored ${percentColored}`)
        const percentWhite = 100 - percentColored;
        console.log(`percentWhite ${percentWhite}`)
        remaining = 0; // Після градієнта залишок закінчується
        return {
          background: `linear-gradient(to right, rgb(160, 159, 243) ${percentColored}% ${percentWhite}%, white ${percentWhite}%)`,
        };
      }
    });
  
    return styles;
  }
  

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
            <div className='progress-bar-block' style={progressBarStyles[0]}>Quantity {selected}</div>
              { 
                blocks.map((block, index)=>{
                  return (
                    <div className='progress-bar-block'
                    style={progressBarStyles[index+1]}>-{block.discount}%</div>
                  )
                })
              }
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
                <tr className='table-row' >
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