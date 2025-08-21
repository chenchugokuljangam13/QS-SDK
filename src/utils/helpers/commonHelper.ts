import fs from "fs";
import path from "path";
import { DataSet } from "./quickSightClient";
import { getGroupArn } from "./arnHelper";
import { AnalysisDefinition } from "../types";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
import "dotenv/config";

const getArg = (key: string): string | undefined => {
  const arg = process.argv.find(a => a.startsWith(`--${key}=`));
  return arg ? arg.split("=")[1] : undefined;
}

export const REGION = getArg("region");
const stsClient = new STSClient({ region: REGION });

export const getAccountId = async (): Promise<string> => {
  const resp = await stsClient.send(new GetCallerIdentityCommand({}));
  if (!resp.Account) {
    throw new Error("Could not fetch AWS Account ID");
  }
  return resp.Account;
};

export const loadAnalysisDefinitions = async (
  baseDir: string,
  dataSetList: DataSet
): Promise<AnalysisDefinition[]> => {
  const configs: AnalysisDefinition[] = [];
  const folders = fs.readdirSync(baseDir);
  for (const folder of folders) {
    const files = fs.readdirSync(path.join(baseDir, folder));
    for (const file of files) {
      if (file.endsWith(".ts")) {
        const defPath = path.join(baseDir, folder, file);
        const analysisModule = require(defPath) as Record<string, unknown>;
        const analysisObj = Object.values(analysisModule)[0] as AnalysisDefinition;
        analysisObj.Definition.DataSetIdentifierDeclarations[0].DataSetArn =
          dataSetList[analysisObj.DataSetName];
        if (analysisObj.Permissions && analysisObj.Permissions.length > 0) {
          const principalArn = await getGroupArn(analysisObj.GroupName);
          analysisObj.Permissions[0].Principal = principalArn;
        }
        configs.push(analysisObj);
      }
    }
  }

  return configs;
};

