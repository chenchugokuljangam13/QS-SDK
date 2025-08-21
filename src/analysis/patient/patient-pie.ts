import { AnalysisDefinition, ResourcePermission } from "@aws-sdk/client-quicksight";

export const patientPieAnalysis = {
  GroupName: "Analysts",
  DataSetName: "test",
  AnalysisId: "patient-analysis-pie",
  Name: "Patient Analysis Pie Chart",
  Definition: {
    "DataSetIdentifierDeclarations": [
      {
        "Identifier": "MyDataSetPlaceholder",
        "DataSetArn": "" // <-- Fill in actual DataSetArn
      }
    ],
    "Sheets": [
      {
        "SheetId": "pie-sheet",
        "Name": "Patients Pie Chart Analysis",
        "Visuals": [
          {
            "PieChartVisual": {
              "VisualId": "pie1",
              "Title": {
                "Visibility": "VISIBLE",
                "Text": "Patient Visits by Diagnosis"
              },
              "ChartConfiguration": {
                "FieldWells": {
                  "PieChartAggregatedFieldWells": {
                    "Category": [
                      {
                        "FieldId": "Diagnosis",
                        "CategoricalDimensionField": {
                          "FieldId": "Diagnosis",
                          "Column": {
                            "DataSetIdentifier": "MyDataSetPlaceholder",
                            "ColumnName": "diagnosis"
                          }
                        }
                      }
                    ],
                    "Values": [
                      {
                        "FieldId": "Visits Count",
                        "NumericalMeasureField": {
                          "FieldId": "Visits Count",
                          "AggregationFunction": { "SimpleNumericalAggregation": "COUNT" },
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
                "SheetId": "pie-sheet",
                "Scope": "SELECTED_VISUALS",
                "VisualIds": ["pie1"]
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
                "SheetId": "pie-sheet",
                "Scope": "SELECTED_VISUALS",
                "VisualIds": ["pie1"]
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
      Principal: "" // <-- Fill in the ARN of user/group/role
    }
  ] as ResourcePermission[],
};
