export interface memberCount{
  channel: string;
  text: string;
}

export interface joinleaveMessage {
  message: string;
  channel: string;
}

export interface countingData {
  channel: string;
  count: number;
  maxcount: number;
}