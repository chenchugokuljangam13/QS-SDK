import { ResourcePermission } from "@aws-sdk/client-quicksight";

export interface AnalysisDefinition {
  DataSetName: string;
  GroupName: string;
  AnalysisId: string;
  Name: string;
  Definition: any;
  Permissions?: ResourcePermission[];
}