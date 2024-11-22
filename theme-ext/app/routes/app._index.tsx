import { useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  InlineGrid,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import CardWithHeaderIconActions from '../components/CardForStat';
import IndexTableWithoutCheckboxesExample from "app/components/firstPageTable";
import { indexLoader } from "app/loaders/app._index.loader";

export const loader = indexLoader

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  return  null;
};

export default function Index() { 
  const { funnels } = useLoaderData<typeof indexLoader>();
  console.log(funnels);
  const titlesForStatsCards = [
    {title: 'Total items ordered', subtitle: '0'},
    {title: 'Total sales', subtitle: '0$'},
    {title: 'Total discounts', subtitle: '0$'}];
  return (
    <Page>
      <BlockStack gap="1600">
        <InlineGrid gap="400" columns={3}>
          {titlesForStatsCards.map((el, idx)=>{
            return (
            <CardWithHeaderIconActions
            key={idx} 
            title={el.title} 
            subtitle={el.subtitle} 
             />
          )
          })}
        </InlineGrid>
        <BlockStack gap="1600">
          <InlineStack align="space-between">
            <Text variant="headingXl" as="h4">
              Offers list
            </Text>
            <Form method="post" action="">
              <Button variant="primary" tone="success" >Create new</Button>
            </Form>
          </InlineStack>
          <IndexTableWithoutCheckboxesExample funnels={funnels} />
        </BlockStack>
      </BlockStack>
    </Page>
  );
}
