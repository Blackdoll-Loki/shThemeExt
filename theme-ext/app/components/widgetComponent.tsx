import { Box, InlineStack, Select, Text } from '@shopify/polaris';
import '../styles/widget.css';
import { useCallback, useMemo, useState } from 'react';

interface WidgetProps {
  blocks: Array<Block>;
}
interface Block {
  blockId: number;
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
        acc = cur.volume;
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
      //const volumes = arr.map((obj) => obj.volume);
      const volumes = [{
        blockId: 0, 
        volume: 0, 
        discount: 0, 
        label: '', 
        description: ''
      }, ...arr].map((obj)=> obj.volume);
      const select = Number(selected); // Поточне значення selected
      let nextBlockGrad = select;

      const styles = volumes.map((volume, index) => {
          const nextVolume = volumes[index + 1]
          const oneLessThenNextVolume = (volumes[index + 1] - 1)

          if(nextBlockGrad > 0 && select < oneLessThenNextVolume){
              const percentColored = Math.round((select /  oneLessThenNextVolume) * 100);
              const percentWhite = 100 - percentColored;
              nextBlockGrad = select - oneLessThenNextVolume
              return {
                      background: `linear-gradient(to right, rgb(160, 159, 243) ${percentColored}% ${percentWhite}%, white ${percentWhite}%)`,
                      };
          } else if(select >= oneLessThenNextVolume){
            nextBlockGrad = select - oneLessThenNextVolume
            return { background: 'rgb(160, 159, 243)' }
          } else 
          if(select === volume){
            return { background: 'rgb(160, 159, 243)' }
          }
      })
      console.log('styles', styles);
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
                blocks.sort((block1: Block, block2: Block)=>block1.volume - block2.volume)
                .map((block, index)=>{
                  return (
                    <div className='progress-bar-block'
                    key={index}
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
              {blocks.sort((block1: Block, block2: Block)=>block1.volume - block2.volume)
              .map((obj, index)=>(
                <tr key={index} className='table-row' >
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