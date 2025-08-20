import {
  QuickSightClient,
  CreateAnalysisCommand,
  UpdateAnalysisCommand,
  DescribeAnalysisCommand,
} from "@aws-sdk/client-quicksight";
import { patientAnalysisDefinition } from "../analysis-definitions/patient-analysis.js"; 

const client = new QuickSightClient({ region: "us-east-1" });

const accountId = "797098543009";
const analysisId = "patient-analysis-sdk"; // must be unique & stable
const definition = patientAnalysisDefinition;

async function deployAnalysis() {
  try {
    // Check if analysis exists
    await client.send(
      new DescribeAnalysisCommand({
        AwsAccountId: accountId,
        AnalysisId: analysisId,
      })
    );

    const updateResp = await client.send(
      new UpdateAnalysisCommand({
        AwsAccountId: accountId,
        AnalysisId: analysisId,
        Name: definition.Name,
        Definition: definition.Definition,
        Permissions: definition.Permissions,
      })
    );

    console.log("Analysis updated:", updateResp);
  } catch (err) {
    if (err.name === "ResourceNotFoundException") {
      console.log("Analysis not found. Creating...");

      const createResp = await client.send(
        new CreateAnalysisCommand({
          AwsAccountId: accountId,
          AnalysisId: analysisId,
          Name: definition.Name,
          Definition: definition.Definition,
          Permissions: definition.Permissions,
        })
      );

      console.log("Analysis created:", createResp);
    } else {
      console.error("Error:", err);
    }
  }
}

deployAnalysis();
