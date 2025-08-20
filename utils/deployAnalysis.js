import {
  QuickSightClient,
  CreateAnalysisCommand,
  UpdateAnalysisCommand,
  DescribeAnalysisCommand,
} from "@aws-sdk/client-quicksight";
// import fs from "fs";
import {patientAnalysisDefinition} from "../analysis-definitions/patient-analysis";

const client = new QuickSightClient({ region: "us-east-1" });

const accountId = "797098543009";
const analysisId = "patient-analysis-sdk";

// Load JSON definition
// const definition = JSON.parse(
//   fs.readFileSync("./analysis-definitions/patient-analysis.json", "utf8")
// );
const definition = patientAnalysisDefinition;
async function deployAnalysis() {
  try {
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
    console.log("Updated:", updateResp);
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
      console.log("Created:", createResp);
    } else {
      console.error("Error:", err);
    }
  }
}

deployAnalysis();
