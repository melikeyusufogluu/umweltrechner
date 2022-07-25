export interface IDashboardResponse {
  locations: Location[];
  serverInfo: ServerInfo;
  systemMessages: SystemMessage[];
  version: string;
}

export interface ServerInfo {
  controllerVersion: string;
  serverID: string;
  virtDir: string;
  serverTime: Date;
  calcTime: number;
}

export interface SystemMessage {
  type: string;
  module: string;
  code: number;
  text: string;
}

export interface Location {
  id: string;
  name: string;
  disassembledName: string;
  coord: number[];
  streetName: string;
  type: string;
  matchQuality: number;
  isBest: boolean;
  parent: Parent;
  isGlobalId?: boolean;
  productClasses: number[];
  properties: Properties;
}

export interface Parent {
  id: string;
  name: string;
  type: string;
}

export interface Properties {
  stopId: string;
}



