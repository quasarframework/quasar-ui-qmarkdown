export interface TocDefinition {
    id: String,
    label: string,
    level?: number,
    children?: TocDefinitionArray
  }
  
export type TocDefinitionArray = TocDefinition[]
  