/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ImportTable } from "./import-table";
import { toast } from "sonner";

type Props = {
  entity: string;
  data: string[][]; //CSV-like input data
  requiredFields: string[];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

// Type definition for column state
interface SelectedColumnsState {
  [key: string]: string | null;
}

export const ImportCard = ({
  entity,
  data,
  requiredFields,
  onCancel,
  onSubmit,
}: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );

  // Extract headers and body from input data
  const headers = data[0] || [];
  const body = data.slice(1);

  // Handle column selection change in ImportTable
  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      // Ensure no duplicate selection for required fields
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      // Update the selected column value
      newSelectedColumns[`column_${columnIndex}`] =
        value === "skip" ? null : value;

      return newSelectedColumns;
    });
  };

  // Calculate progress based on completed required options
  const progress = Object.values(selectedColumns).filter(Boolean).length;

  // Handle the "Continue" button action
  const handleContinue = () => {
    const getColumnIndex = (column: string) => column.split("_")[1];

    // Map selected columns to the corresponding data
    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });
          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0) as string[][],
    };

    // Convert the mapped data into key-value pairs
    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: Record<string, string>, cell, index) => {
        const header = mappedData.headers[index];
        if (header !== null) {
          acc[header] = cell;
        }
        return acc;
      }, {});
    });

    const validateDataType = (item: Record<string, any>, field: string) => {
      // Add your custom validation logic here for each field type
      const fieldType = typeof item[field];
      if (fieldType === "string") {
        return true; // Return true if it's valid, otherwise false
      }
      if (fieldType === "number" && !isNaN(Number(item[field]))) {
        return true;
      }
      return false;
    };

    // Format and validate the final data
    const formattedData = arrayOfData
      .filter((item) =>
        requiredFields.some(
          (field) => item[field] && validateDataType(item, field)
        )
      )
      .map((item) => {
        const formattedItem: Record<string, any> = {};
        requiredFields.forEach((field) => {
          const fieldValue = item[field];

          // Handle phone field specifically
          if (field === "phone") {
            // If phone exists, remove spaces and ensure it's a string
            if (fieldValue !== undefined && fieldValue !== null) {
              // Remove white spaces and ensure the phone is stored as a string
              formattedItem[field] = String(fieldValue).replace(/\s+/g, "");
            } else {
              formattedItem[field] = undefined; // Assign empty string if phone is missing
            }
          } else {
            // Handle other fields as before
            if (fieldValue !== undefined && fieldValue !== null) {
              formattedItem[field] = isNaN(Number(fieldValue))
                ? fieldValue
                : String(fieldValue); // Ensure other fields are stored as strings
            } else {
              formattedItem[field] = undefined; // Assign empty string if the field is missing
            }
          }
        });
        return formattedItem;
      });

    if (formattedData.length) {
      onSubmit(formattedData);
    } else {
      toast.error("No valid data to submit");
    }
  };

  return (
    <div className="w-full">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import {entity}
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button onClick={onCancel} size="sm" className="w-full lg:w-auto">
              Cancel
            </Button>
            <Button
              disabled={progress < requiredFields.length}
              size="sm"
              className="w-full lg:w-auto"
              onClick={handleContinue}
            >
              Continue ({progress} / {requiredFields.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
