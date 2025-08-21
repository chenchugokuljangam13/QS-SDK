import { QuickSightClient, ListDataSetsCommand } from "@aws-sdk/client-quicksight";
import { REGION } from "./commonHelper";
export const qsClient = new QuickSightClient({ region: REGION });
export type DataSet = Record<string, string>;