import { QuickSightClient, ListDataSetsCommand } from "@aws-sdk/client-quicksight";
const REGION = "us-east-1";

export const qsClient = new QuickSightClient({ region: REGION });
export type DataSet = Record<string, string>;