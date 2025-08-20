import { 
  QuickSightClient, 
  CreateAnalysisCommand, 
  UpdateAnalysisCommand, 
  UpdateAnalysisPermissionsCommand 
} from "@aws-sdk/client-quicksight";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
import path from "path";
import { loadAnalysisDefinitions, AnalysisDefinition } from "./utils/helper";
import { getDataSetArns, DataSet } from "./utils/datasets";

const REGION = "us-east-1"; 

// Create AWS clients
const qsClient = new QuickSightClient({ region: REGION });
const stsClient = new STSClient({ region: REGION });

// Dynamically fetch AWS Account ID
export const getAccountId = async (): Promise<string> => {
  const resp = await stsClient.send(new GetCallerIdentityCommand({}));
  if (!resp.Account) {
    throw new Error("Could not fetch AWS Account ID");
  }
  return resp.Account;
};

const createOrUpdateAnalysis = async (definition: AnalysisDefinition, accountId: string) => {
  const { AnalysisId, Name, Definition, Permissions } = definition;

  try {
    const updateCmd = new UpdateAnalysisCommand({
      AwsAccountId: accountId,
      AnalysisId,
      Name,
      Definition,
    });
    await qsClient.send(updateCmd);
    console.log(`Updated analysis: ${AnalysisId}`);

    if (Permissions) {
      const permCmd = new UpdateAnalysisPermissionsCommand({
        AwsAccountId: accountId,
        AnalysisId,
        GrantPermissions: Permissions,
      });
      await qsClient.send(permCmd);
      console.log(`Updated permissions for: ${AnalysisId}`);
    }
  } catch (err: any) {
    if (err.name === "ResourceNotFoundException") {
      const createCmd = new CreateAnalysisCommand({
        AwsAccountId: accountId,
        AnalysisId,
        Name,
        Definition,
        Permissions,
      });
      console.log(createCmd);
      await qsClient.send(createCmd);
      console.log(`Created analysis: ${AnalysisId}`);
    } else {
      console.error(`Error with ${AnalysisId}:`, err);
    }
  }
};

const main = async () => {
  const accountId = await getAccountId();
  const dataSetList = await getDataSetArns(accountId);
  const analysesDir = path.join(__dirname, "../src/analysis");
  const analysisConfigs = loadAnalysisDefinitions(analysesDir, dataSetList);

  for (const analysis of analysisConfigs) {
    console.log('test')
    await createOrUpdateAnalysis(analysis, accountId);
  }
};

main().catch((err) => console.error("Script failed:", err));
