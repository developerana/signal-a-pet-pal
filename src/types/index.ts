export type Species = "cachorro" | "gato" | "ave" | "outro";
export type OccurrenceStatus =
  | "desaparecido"
  | "avistado"
  | "encontrado"
  | "reencontrado"
  | "obito";

export interface Sighting {
  id: string;
  occurrenceId: string;
  date: string;
  time: string;
  neighborhood: string;
  description: string;
  behavior?: string;
  photoUrl?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  kind: "registro" | "avistamento" | "status";
  text: string;
}

export interface Occurrence {
  id: string;
  name: string;
  species: Species;
  breed?: string;
  sex?: "macho" | "femea" | "indefinido";
  age?: string;
  size?: "pequeno" | "medio" | "grande";
  color?: string;
  status: OccurrenceStatus;
  city: string;
  neighborhood: string;
  reference?: string;
  /** Approximate distance in km — never exact residential location. */
  distanceKm: number;
  date: string;
  time?: string;
  summary: string
  description: string;
  photoUrl: string;
  photos?: string[];
  contactPreference: "chat" | "whatsapp-mediado" | "email-mediado";
  sightingsCount: number;
  sightings: Sighting[];
  timeline: TimelineEvent[];
  /** Approximate coordinates (0-100 %) used by the demo map canvas. */
  map: { x: number; y: number };
}

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed?: string;
  age?: string;
  traits: string;
  notes?: string;
  photoUrl: string;
}

export interface AppNotification {
  id: string;
  kind: "avistamento" | "proxima" | "status";
  title: string;
  body: string;
  time: string;
  read: boolean;
  occurrenceId?: string;
}
