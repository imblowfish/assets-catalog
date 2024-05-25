export interface AssetCreationRequest {
  title: string;
  description: string;
  objectUrl: string;
}

export interface FileCreationResponse {
  name: string;
  type: string;
  size: number;
  url: string;
  lastModified: number;
}
