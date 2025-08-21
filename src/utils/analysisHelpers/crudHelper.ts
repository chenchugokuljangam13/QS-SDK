import { 
  CreateAnalysisCommand, 
  UpdateAnalysisCommand, 
  UpdateAnalysisPermissionsCommand 
} from "@aws-sdk/client-quicksight";
import { AnalysisDefinition } from "../types";
import { qsClient } from "../helpers/quickSightClient";


export const createOrUpdateAnalysis = async (definition: AnalysisDefinition, accountId: string) => {
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