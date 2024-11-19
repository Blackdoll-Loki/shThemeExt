import {
  Page,
  Text,
  BlockStack,
  Button,
  Card,
} from "@shopify/polaris";
import  TextFieldComponent  from '../components/textField';
import DiscountSettingsBlock from "app/components/DiscountSettingsBlock";
import SelectProductComponent from '../components/SelectProductComponent';


export default function AdditionalPage() {

  return (
    <Page
    backAction={{content: 'Settings', url: '#'}}
    title="Funnel configuration"
    >
      <Card>
        <BlockStack gap="500">
          <Text variant="headingXl" as="h4">
            Here will be the funnel widget preview
          </Text>
          <TextFieldComponent />
          <SelectProductComponent />
          <BlockStack gap="800">
          <Text variant="headingMd" as="h6">
            Discount configuration
          </Text>
            <DiscountSettingsBlock volume={3} discount={5}/>
            <DiscountSettingsBlock volume={5} discount={10}/>
            <DiscountSettingsBlock volume={10} discount={15}/>
          </BlockStack>
        </BlockStack>
      </Card>
    </Page>
  );
}

