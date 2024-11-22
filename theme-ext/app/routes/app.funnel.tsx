import {
  Page,
  Text,
  BlockStack,
  Button,
  Card,
  InlineStack,
  Box,
  Checkbox,
} from "@shopify/polaris";
import  TextFieldComponent  from '../components/textField';
import DiscountSettingsBlock from "app/components/DiscountSettingsBlock";
import SelectProductComponent, { SelectedProduct } from "../components/SelectProductComponent";
import { useCallback, useState } from "react";
import WidgetComponent from "app/components/widgetComponent";
import { funnelAction } from "app/actions/funnel.action";
import { Form } from "@remix-run/react";




export const action = funnelAction


export default function FunnelPage() {
  const [blocks, setBlocks] = useState([
    { blockId: 1, volume: 3, discount: 5, label: "-5%", description: "5% discount" },
    { blockId: 2, volume: 5, discount: 10, label: "-10%", description: "10% discount" },
    { blockId: 3, volume: 10, discount: 15, label: "-15%", description: "15% discount" },
  ]);
  const [funnelName, setFunnelName] = useState('');

  const [products, setProducts] = useState<SelectedProduct[]>([]);

  const [checked, setChecked] = useState(false);

  const handleChange = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    []
  );

  const addBlock = () => {
    const newBlock = {
      blockId: Date.now(),
      volume: 0,
      discount: 0,
      label: "",
      description: "",
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  const removeBlock = (id: number) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.blockId !== id));
  };

  const updateBlock = (id: number, updatedValues: Partial<typeof blocks[0]>) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.blockId === id ? { ...block, ...updatedValues } : block
      )
    );
  };

  return (
    <Page
    backAction={{content: 'Settings', url: '#'}}
    title="Funnel configuration"
    >
      <Card>
        <BlockStack gap="500">
          <WidgetComponent blocks={blocks}/>
          <TextFieldComponent onUpdate={(newName: string)=>setFunnelName(newName)} funnelName={funnelName}/>
          <SelectProductComponent products={products} setProducts={setProducts} />
          <BlockStack gap="800">
          <Text variant="headingMd" as="h6">
            Discount configuration
          </Text>
          {blocks.map((block, idx) => (
              <DiscountSettingsBlock
                key={idx}
                {...block}
                checked={checked}
                onRemove={() => removeBlock(block.blockId)}
                onUpdate={(updatedValues) => updateBlock(block.blockId, updatedValues)}
              />
            ))}
          </BlockStack>
          <InlineStack align="space-between">
            <Button
             variant="plain"
             onClick={()=>addBlock()}>Add more</Button>
            <Checkbox
              label="Automatic labels (recommended)"
              checked={checked}
              onChange={handleChange}
            />
          </InlineStack>
        </BlockStack>
      </Card>
      <Form method="post" action="">
        <input type="hidden" name="funnelName" value={funnelName} />
        <input type="hidden" name="products" value={JSON.stringify((products))} />
        <input type="hidden" name="blocks" value={JSON.stringify(blocks)} />
        <Box padding="400">
          <InlineStack align="end">
            <Button variant="primary" tone="success" submit>Create</Button>
          </InlineStack>
        </Box>
      </Form>
    </Page>
  );
}

