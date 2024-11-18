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
  async function selectProduct() {
    const products = await window.shopify.resourcePicker({
      type: "product",
      action: "select", // customized action verb, either 'select' or 'add',
    });

    // if (products) {
    //   const { images, id, variants, title, handle } = products[0];

    //   setFormState({
    //     ...formState,
    //     productId: id,
    //     productVariantId: variants[0].id,
    //     productTitle: title,
    //     productHandle: handle,
    //     productAlt: images[0]?.altText,
    //     productImage: images[0]?.originalSrc,
    //   });
    // }
  }

  return (
    <Page
    backAction={{content: 'Settings', url: '#'}}
    title="Funnel configuration"
    primaryAction={<Button variant="primary" tone="success">Save</Button>}
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

