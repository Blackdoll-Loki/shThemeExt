import { BlockStack, Box, Button, InlineGrid, InlineStack, Text, TextField } from "@shopify/polaris"
import SelectExample from './Select'
import { useCallback, useState } from "react";
import { XIcon } from '@shopify/polaris-icons';

interface DiscountSettingsBlockProps{
  volume: number;
  discount: number;
  onRemove: () => void;
}

export default function DiscountSettingsBlock (props: DiscountSettingsBlockProps){
  const [description, setDescription] = useState(`${props.discount}% discount`);
  const [label, setLabel] = useState(`-${props.discount}%`);
  const [volumeValue, setVolumeValue] = useState('1');
  const [discountValue, setDiscountValue] = useState('1');

  const handleVolumeChange = useCallback(
    (newValue: string) => setVolumeValue(newValue),
    [],
  );

  const handleDescriptionChange = useCallback(
    (newValue: string) => setDescription(newValue),
    [],
  );

  const handleLabelChange = useCallback(
    (newValue: string) => setLabel(newValue),
    [],
  );

  const handleDiscountChange = useCallback((newDiscount: string) => {
    setDiscountValue(newDiscount) // Конвертуємо значення
    setDescription(`${newDiscount}% discount`);
    setLabel(`-${newDiscount}%`);
  }, []);

  
  return (
    <InlineStack gap='300' align="center">
      <Button
       variant="plain"
       icon={XIcon}
       accessibilityLabel="Remove discount block"
       onClick={props.onRemove} />
      <Box width="210px">
        <BlockStack gap="300">
          <Text variant="headingMd" as="h6" tone="subdued">
            Volume
          </Text>
          <TextField
            label=""
            type="number"
            value={volumeValue}
            onChange={handleVolumeChange}
            autoComplete="off"
          />
          <Text as="p" tone="subdued">
            Volume triggering promotion
          </Text>
        </BlockStack>
      </Box>
      <Box width="210px">
        <BlockStack gap="300">
          <Text variant="headingMd" as="h6" tone="subdued">
            Discount
          </Text>
          <TextField
            label=""
            type="number"
            value={volumeValue}
            onChange={handleDiscountChange}
            autoComplete="off"
          />
          <Text as="p" tone="subdued">
            Discount value in %
          </Text>
        </BlockStack>
      </Box>
      <Box width="210px">
        <BlockStack gap="300">
          <Text variant="headingMd" as="h6" tone="subdued">
            Description
          </Text>
          <TextField
            label=""
            value={description}
            onChange={handleDescriptionChange}
            autoComplete="off"
          />
          <Text as="p" tone="subdued">
            Discount for this volume discount
          </Text>
        </BlockStack>
      </Box>
      <Box width="210px">
        <BlockStack gap="300">
          <Text variant="headingMd" as="h6" tone="subdued">
            Label
          </Text>
          <TextField
            label=""
            value={label}
            onChange={handleLabelChange}
            autoComplete="off"
          />
          <Text as="p" tone="subdued">
            Discount label
          </Text>
        </BlockStack>
      </Box>
    </InlineStack>
  )
}