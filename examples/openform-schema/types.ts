/** Portable source application model. Implementation-neutral values; no DOM types. */
export type Theme = "light" | "dark";
export type Destination = {id:string;label:string;kind:"local"|"http";url:string;enabled:boolean;required:boolean};
export type Connections = {version:1;targets:Destination[]};
export type Field = {id:string;label:string;type:"text"|"email"|"textarea"|"date"|"select";required:boolean;options?:string[]};
export type LineItem = {id:string;description:string;quantity:number;unitPrice:number};
export type SchemaConfig = {schemaVersion:1;id:string;title:string;description:string;currency:string;taxRate:number;appearance:{theme:Theme};sections:{id:string;title:string;fields:Field[]}[];connections:Connections};
export type RecordEnvelope = {schemaVersion:1;formId:string;id:string;submittedAt:string;answers:Record<string,unknown>};
export type QuoteState = {answers:Record<string,unknown>;items:LineItem[];stage:number;published:boolean};
