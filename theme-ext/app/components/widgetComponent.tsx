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

  // function getProgressBarStyles(arr: Block[], selected: string) {
  //   const volumes = arr.map((obj) => obj.volume);
  //   const select = Number(selected); // Поточне значення selected
  //   let remaining = select
  //   const styles = volumes.map((volume, index) => {
  //     if(select >= (volume - 1)){
  //       return { background: 'rgb(160, 159, 243)' }
  //     }

  //     if(select < volume && remaining !== 0 ){
  //       const percentColored = Math.round((remaining / volume) * 100);
  //       const percentWhite = 100 - percentColored;
  //       remaining = 0
  //       return {
  //            background: `linear-gradient(to right, rgb(160, 159, 243) ${percentColored}%, white ${percentWhite}%)`,
  //       };
  //     } 
  //   });
  //   console.log(styles)
  //   return styles;
  // }

  function getProgressBarStyles(arr: Block[], selected: string) {
      const volumes = arr.map((obj) => obj.volume);
      const select = Number(selected); // Поточне значення selected
      let nextBlockGrad = 0;

      const styles = volumes.map((volume, index) => {
          if(select >= volume){
            nextBlockGrad = 1
            return { background: 'rgb(160, 159, 243)' }
          }
          if(nextBlockGrad || select < volume){
            const percentColored = Math.round((select / volume) * 100);
            const percentWhite = 100 - percentColored;
            if(select < volume){
              nextBlockGrad = 0
            }
            return {
              background: `linear-gradient(to right, rgb(160, 159, 243) ${percentColored}%, white ${percentWhite}%)`,
             };
          }
      })
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
              .map((obj)=>(
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