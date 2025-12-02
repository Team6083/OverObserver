
export type Event = {
  key: string;
  year: number;
  eventCode: string;
  eventType: number;
  week: number;

  name: string;
  shortName: string;

  country?: string;
  stateProv?: string;
  city?: string;
  address?: string;

  startDate: Date;
  endDate: Date;
  timezone: string;

  scoutForm?: string;
  archived: boolean;
}

export type Match = {
  key: string;
  eventKey: string;
  compLevel: "qm" | "ef" | "qf" | "sf" | "f";
  setNumber: number;
  matchNumber: number;

  time: Date;
  predictedTime?: Date;
  actualTime?: Date;
  postResultTime?: Date;

  alliances: {
    red: MatchAlliance;
    blue: MatchAlliance;
  }
  winningAlliance?: "red" | "blue";
}

export type MatchAlliance = {
  teamKeys: string[];
  score?: number;
  surrogateTeamKeys?: string[];
  dqTeamKeys?: string[];
}

export type ScoutData = {
  matchKey: string;
  teamKey: string;
  
  userId: string;
  data: Record<string, unknown>;
}

export interface TBAWebcast {
  channel: string;
  type: string;
}

export interface TBAEvent {
  address: string;
  city: string;
  country: string;
  district: string | null;
  division_keys: string[];
  end_date: string;
  event_code: string;
  event_type: number;
  event_type_string: string;
  first_event_code: string;
  first_event_id: string | null;
  gmaps_place_id: string;
  gmaps_url: string;
  key: string;
  lat: number;
  lng: number;
  location_name: string;
  name: string;
  parent_event_key: string | null;
  playoff_type: number;
  playoff_type_string: string;
  postal_code: string;
  remap_teams: unknown;
  short_name: string;
  start_date: string;
  state_prov: string;
  timezone: string;
  webcasts: TBAWebcast[];
  website: string;
  week: number;
  year: number;
}
