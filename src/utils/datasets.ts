import { QuickSightClient, ListDataSetsCommand } from "@aws-sdk/client-quicksight";

const REGION = "us-east-1";
const qsClient = new QuickSightClient({ region: REGION });
export type DataSet = Record<string, string>;

export const getDataSetArns = async (accountId: string): Promise<DataSet> => {
  const cmd = new ListDataSetsCommand({ AwsAccountId: accountId });
  const resp = await qsClient.send(cmd);

  const datasetMap: DataSet = {};

  resp.DataSetSummaries?.forEach(ds => {
    if (ds.Name && ds.Arn) {
      datasetMap[ds.Name] = ds.Arn;
    }
  });

  console.log(datasetMap);
  return datasetMap;
};
