import fs from "fs";
import path from "path";
import { DataSet } from "./datasets";

export interface AnalysisDefinition {
  DataSetName: string;
  AnalysisId: string;
  Name: string;
  Definition: any;
  Permissions?: any[];
}

export const loadAnalysisDefinitions = (baseDir: string, dataSetList: DataSet): AnalysisDefinition[] => {

  const configs: AnalysisDefinition[] = [];
  const folders = fs.readdirSync(baseDir);
  for (const folder of folders) {
    const files = fs.readdirSync(path.join(baseDir, folder));
    for (const file of files) {
      if (file.endsWith(".ts")) {
        const defPath = path.join(baseDir, folder, file);
        const analysisModule = require(defPath) as Record<string, unknown>;
        const analysisObj = Object.values(analysisModule)[0] as AnalysisDefinition;
        analysisObj.Definition.DataSetIdentifierDeclarations[0].DataSetArn = dataSetList[analysisObj.DataSetName];
        configs.push(analysisObj);
      }
    }
  }
  return configs;
};
