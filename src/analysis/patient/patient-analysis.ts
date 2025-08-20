import { AnalysisDefinition, ResourcePermission } from "@aws-sdk/client-quicksight";
import {getAccountId} from "../../main";
const accountId = getAccountId();

export const patientAnalysis = {
  DataSetName: "test",
  AnalysisId: "patient-analysis-sdk",
  Name: "Patient Analysis sdk",
  Definition: {
       "DataSetIdentifierDeclarations": [
            {
                 "Identifier": "MyDataSetPlaceholder",
                 "DataSetArn": ""
            }
       ],
       "Sheets": [
            {
                 "SheetId": "main-sheet",
                 "Name": "Patients Analysis sdk",
                 "Visuals": [
                      {
                           "TableVisual": {
                                "VisualId": "visual1",
                                "Title": {
                                     "Visibility": "VISIBLE",
                                     "Text": "Patient Visits Overview"
                                },
                                "ChartConfiguration": {
                                     "FieldWells": {
                                          "TableAggregatedFieldWells": {
                                               "GroupBy": [
                                                    {
                                                         "FieldId": "patient_name",
                                                         "CategoricalDimensionField": {
                                                              "FieldId": "patient_name",
                                                              "Column": {
                                                                   "DataSetIdentifier": "MyDataSetPlaceholder",
                                                                   "ColumnName": "patient_name"
                                                              }
                                                         }
                                                    },
                                                    {
                                                         "FieldId": "doctor_name",
                                                         "CategoricalDimensionField": {
                                                              "FieldId": "doctor_name",
                                                              "Column": {
                                                                   "DataSetIdentifier": "MyDataSetPlaceholder",
                                                                   "ColumnName": "doctor_name"
                                                              }
                                                         }
                                                    },
                                                    {
                                                         "FieldId": "diagnosis",
                                                         "CategoricalDimensionField": {
                                                              "FieldId": "diagnosis",
                                                              "Column": {
                                                                   "DataSetIdentifier": "MyDataSetPlaceholder",
                                                                   "ColumnName": "diagnosis"
                                                              }
                                                         }
                                                    },
                                                    {
                                                         "FieldId": "visit_date",
                                                         "DateDimensionField": {
                                                              "FieldId": "visit_date",
                                                              "Column": {
                                                                   "DataSetIdentifier": "MyDataSetPlaceholder",
                                                                   "ColumnName": "visit_date"
                                                              },
                                                              "Format": "yyyy-MM-dd"
                                                         }
                                                    }
                                               ]
                                          }
                                     }
                                }
                           }
                      }
                 ]
            }
       ]
  } as unknown as AnalysisDefinition,
  Permissions: [
    {
      Actions: [
        "quicksight:DescribeAnalysis",
        "quicksight:UpdateAnalysis",
        "quicksight:DeleteAnalysis",
        "quicksight:QueryAnalysis",
        "quicksight:RestoreAnalysis",
        "quicksight:UpdateAnalysisPermissions",
        "quicksight:DescribeAnalysisPermissions",
      ],
      Principal:
        `arn:aws:quicksight:us-east-1:797098543009:group/default/Analysts`,
    },
  ] as ResourcePermission[],
};