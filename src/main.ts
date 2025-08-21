import path from "path";
import { getAccountId, loadAnalysisDefinitions } from "./utils/helpers/commonHelper";
import { getDataSetArns } from "./utils/datasets";
import { createOrUpdateAnalysis } from "./utils/analysisHelpers/crudHelper";
import "dotenv/config";

const getArg = (key: string): string | undefined => {
  const arg = process.argv.find(a => a.startsWith(`--${key}=`));
  return arg ? arg.split("=")[1] : undefined;
}

export const REGION =
  getArg("region");

const main = async () => {
  const accountId = await getAccountId();
  const dataSetList = await getDataSetArns(accountId);
  const analysesDir = path.join(__dirname, "../src/analysis");
  const analysisConfigs = await loadAnalysisDefinitions(analysesDir, dataSetList);
  for (const analysis of analysisConfigs) {
    await createOrUpdateAnalysis(analysis, accountId);
  }
};

main().catch((err) => console.error("Script failed:", err));
export { getAccountId };

