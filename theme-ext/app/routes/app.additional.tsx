import {
  Page,
  Text,
  BlockStack,
  Button,
  Card,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import  TextFieldComponent  from '../components/textField';
import DiscountSettingsBlock from "app/components/DiscountSettingsBlock";

export default function AdditionalPage() {
  return (
    <Page
    backAction={{content: 'Settings', url: '#'}}
    title="Funnel configuration"
    primaryAction={<Button variant="primary" tone="success">Save</Button>}
    >
      <Card>
        <BlockStack gap="500">
          <Text variant="headingXl" as="h4">
            Here will bu the funnel widget preview
          </Text>
          <TextFieldComponent />
          <BlockStack gap="500">
            <Text variant="headingXl" as="h4">
              Apply offer to
            </Text>
            <DiscountSettingsBlock />
          </BlockStack>
        </BlockStack>
      </Card>
    </Page>
  );
}

