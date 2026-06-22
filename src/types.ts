export type DataAsset = {
  name: string;
  description: string;
  format: string;
  required: boolean;
  sourcing_instructions?: string;
  uploaded?: boolean;
};

export type Manifest = {
  models_required: string[];
  data_assets: DataAsset[];
  audit_summary: string;
};

export type AppState = 'input' | 'manifest' | 'dashboard';
