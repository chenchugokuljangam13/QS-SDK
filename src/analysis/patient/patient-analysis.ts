import { AnalysisDefinition, ResourcePermission } from "@aws-sdk/client-quicksight";
export const patientAnalysis = {
  GroupName: "Analysts",
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
                        "FieldId": "Patient Name",
                        "CategoricalDimensionField": {
                          "FieldId": "Patient Name",
                          "Column": {
                            "DataSetIdentifier": "MyDataSetPlaceholder",
                            "ColumnName": "patient_name"
                          }
                        }
                      },
                      {
                        "FieldId": "Doctor Name",
                        "CategoricalDimensionField": {
                          "FieldId": "Doctor Name",
                          "Column": {
                            "DataSetIdentifier": "MyDataSetPlaceholder",
                            "ColumnName": "doctor_name"
                          }
                        }
                      },
                      {
                        "FieldId": "Diagnosis",
                        "CategoricalDimensionField": {
                          "FieldId": "Diagnosis",
                          "Column": {
                            "DataSetIdentifier": "MyDataSetPlaceholder",
                            "ColumnName": "diagnosis"
                          }
                        }
                      },
                      {
                        "FieldId": "Visited Date",
                        "DateDimensionField": {
                          "FieldId": "Visited Date",
                          "Column": {
                            "DataSetIdentifier": "MyDataSetPlaceholder",
                            "ColumnName": "visit_date"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        ],
        "FilterControls": [
          {
            "Dropdown": {
              "FilterControlId": "diagnosis_dropdown",
              "Title": "Diagnosis",
              "SourceFilterId": "diagnosis_filter",
              "Type": "MULTI_SELECT"
            }
          },
          {
            "DateTimePicker": {
              "FilterControlId": "time_filter",
              "Title": "Visit Date",
              "SourceFilterId": "visit_date_filter",
              "Type": "DATE_RANGE"
            }
          }
        ]
      }
    ],
    "FilterGroups": [
      {
        "FilterGroupId": "diagnosis_group",
        "CrossDataset": "SINGLE_DATASET",
        "Filters": [
          {
            "CategoryFilter": {
              "FilterId": "diagnosis_filter",
              "Column": {
                "DataSetIdentifier": "MyDataSetPlaceholder",
                "ColumnName": "diagnosis"
              },
              "Configuration": {
                "FilterListConfiguration": {
                  "MatchOperator": "CONTAINS",
                  "NullOption": "NON_NULLS_ONLY"
                }
              }
            }
          }
        ],
        "ScopeConfiguration": {
          "SelectedSheets": {
            "SheetVisualScopingConfigurations": [
              {
                "SheetId": "main-sheet",
                "Scope": "SELECTED_VISUALS",
                "VisualIds": ["visual1"]
              }
            ]
          }
        },
        "Status": "ENABLED"
      },
      {
        "FilterGroupId": "visit_date_group",
        "CrossDataset": "SINGLE_DATASET",
        "Filters": [
          {
            "TimeRangeFilter": {
              "FilterId": "visit_date_filter",
              "Column": {
                "DataSetIdentifier": "MyDataSetPlaceholder",
                "ColumnName": "visit_date"
              },
              "NullOption": "NON_NULLS_ONLY",
              "TimeGranularity": "DAY"
            }
          }
        ],
        "ScopeConfiguration": {
          "SelectedSheets": {
            "SheetVisualScopingConfigurations": [
              {
                "SheetId": "main-sheet",
                "Scope": "SELECTED_VISUALS",
                "VisualIds": ["visual1"]
              }
            ]
          }
        },
        "Status": "ENABLED"
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
        "quicksight:DescribeAnalysisPermissions"
      ],
      Principal: `arn:aws:quicksight:us-east-1:797098543009:group/default/Analysts`
    }
  ] as ResourcePermission[],
};
