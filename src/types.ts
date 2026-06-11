export interface Flight {
  number: string;
  airline: string;
  originCode: string;
  originName: string;
  originTime: string;
  destCode: string;
  destName: string;
  destTime: string;
  duration: string;
}

export interface Activity {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  time?: string;
  tags?: string[];
  alertTags?: string[];
  greenTags?: string[];
  blueTags?: string[];
  image?: string;
  mapsUrl?: string;
}

export interface TransportStep {
  type: string;
  description: string;
  badge?: string;
}

export interface ItineraryItem {
  activity: Activity;
  nextTransport?: TransportStep;
}

export interface Day {
  number: number;
  name: string;
  date: string;
  summary: string[];
  image: string;
  gradient: string;
  items: ItineraryItem[];
  restaurants?: { name: string; type: string; emoji: string; mapsUrl?: string; address?: string }[];
}

export interface RestaurantItem {
  name: string;
  type: string;
  emoji: string;
}

export interface ExtraItem {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  image: string;
  mapsUrl?: string;
  tips?: string[];
  howToGet?: string;
  tags?: string[];
}

