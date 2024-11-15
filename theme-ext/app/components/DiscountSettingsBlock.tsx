import { BlockStack, Button, InlineStack, Text, TextField } from "@shopify/polaris"
import SelectExample from './Select'
import { useCallback, useState } from "react";
import { XIcon } from '@shopify/polaris-icons';

interface DiscountSettingsBlockProps{
  volume: number;
  discount: number;
}

export default function DiscountSettingsBlock (props: DiscountSettingsBlockProps){
  const [description, setDescription] = useState(`${props.discount}% discount`);
  const [label, setLabel] = useState(`-${props.discount}%`);

  const handleDescriptionChange = useCallback(
    (newValue: string) => setDescription(newValue),
    [],
  );

  const handleLabelChange = useCallback(
    (newValue: string) => setLabel(newValue),
    [],
  );

  const handleDiscountChange = useCallback((newDiscount: string) => {
    const discountValue = parseInt(newDiscount, 10); // Конвертуємо значення
    setDescription(`${discountValue}% discount`);
    setLabel(`-${discountValue}%`);
  }, []);

  
  return (
    <InlineStack gap="500" align="center">
      <BlockStack align="center">
        <Button variant="plain" icon={XIcon} accessibilityLabel="Remove discount block" />
      </BlockStack>
      <BlockStack gap="300">
        <Text variant="headingMd" as="h6" tone="subdued">
          Volume
        </Text>
        <SelectExample min={1} max={props.volume * 2} defaultValue={`${props.volume}`}/>
        <Text as="p" tone="subdued">
          Volume triggering promotion
        </Text>
      </BlockStack>
      <BlockStack gap="300">
        <Text variant="headingMd" as="h6" tone="subdued">
          Discount
        </Text>
        <SelectExample min={1} max={props.discount * 2} str="%" defaultValue={`${props.discount}`} onValueChange={handleDiscountChange}/>
        <Text as="p" tone="subdued">
          Discount value in %
        </Text>
      </BlockStack>
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
    </InlineStack>
  )
}