import { useState } from "react";
import { toast } from "sonner";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

export const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

type ImporDataProps = {
  entity: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createMutation: any;
};

export const useImportData = ({ entity, createMutation }: ImporDataProps) => {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const onSubmitImport = async (values: []) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onCancelImport();
        toast.success(`${entity} imported successfully!`);
      },
      onError: () => {
        toast.error(`Error importing ${entity}.`);
      },
    });
  };

  return {
    variant,
    VARIANTS,
    importResults,
    onUpload,
    onCancelImport,
    onSubmitImport,
  };
};
