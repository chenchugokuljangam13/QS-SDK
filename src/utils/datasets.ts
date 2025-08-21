import { DataSet, qsClient } from "./helpers/quickSightClient"
import {  ListDataSetsCommand } from "@aws-sdk/client-quicksight";

export const getDataSetArns = async (accountId: string): Promise<DataSet> => {
  const cmd = new ListDataSetsCommand({ AwsAccountId: accountId });
  const resp = await qsClient.send(cmd);
  const datasetMap: DataSet = {};
  resp.DataSetSummaries?.forEach(ds => {
    if (ds.Name && ds.Arn) {
      datasetMap[ds.Name] = ds.Arn;
    }
  });
  return datasetMap;
};
