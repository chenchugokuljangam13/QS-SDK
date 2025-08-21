import path from "path";
import { getAccountId, loadAnalysisDefinitions } from "./utils/helpers/commonHelper";
import { getDataSetArns } from "./utils/datasets";
import { createOrUpdateAnalysis } from "./utils/analysisHelpers/crudHelper";

const main = async () => {
  const accountId = await getAccountId();
  const dataSetList = await getDataSetArns(accountId);
  const analysesDir = path.join(__dirname, "../src/analysis");
  const analysisConfigs = await loadAnalysisDefinitions(analysesDir, dataSetList);
  for (const analysis of analysisConfigs) {
    console.log('test')
    await createOrUpdateAnalysis(analysis, accountId);
  }
};

main().catch((err) => console.error("Script failed:", err));
export { getAccountId };

