/**
 * DADOS DE DEMONSTRAÇÃO (MOCK).
 * Estes dados existem apenas para demonstrar a interface do MVP.
 * Substituir por dados reais (banco de dados + API) quando a integração
 * de backend, autenticação e geolocalização for configurada.
 */
import logan from "@/assets/pet-logan.jpg";
import thor from "@/assets/pet-thor.jpg";
import mel from "@/assets/pet-mel.jpg";
import nina from "@/assets/pet-nina.jpg";
import type { AppNotification, Occurrence, Pet } from "@/types";

export const DEMO_PHOTOS = { logan, thor, mel, nina };

export const demoOccurrences: Occurrence[] = [
  {
    id: "logan",
    name: "Logan",
    species: "gato",
    breed: "SRD",
    sex: "macho",
    age: "3 anos",
    size: "medio",
    color: "Preto",
    status: "desaparecido",
    city: "Belo Horizonte",
    neighborhood: "Centro",
    reference: "Próximo à praça principal",
    distanceKm: 0.8,
    date: "19/05",
    time: "18:30",
    summary: "Gato preto, porte médio. Possui uma pequena marca branca no peito.",
    description:
      "Logan saiu pela janela da sala no fim da tarde e não voltou. É dócil, mas se assusta com barulho alto. Atende pelo nome e costuma se esconder embaixo de carros.",
    photoUrl: logan,
    photos: [logan],
    contactPreference: "chat",
    sightingsCount: 2,
    sightings: [
      {
        id: "s1",
        occurrenceId: "logan",
        date: "20/05",
        time: "15:42",
        neighborhood: "Centro",
        description:
          "Vi um gato preto próximo à praça por volta das 18h. Ele estava caminhando em direção à avenida.",
        behavior: "Assustado, andando rápido",
      },
      {
        id: "s2",
        occurrenceId: "logan",
        date: "21/05",
        time: "09:18",
        neighborhood: "Centro",
        description: "Gato preto bebendo água em uma vasilha na calçada da rua das Acácias.",
        behavior: "Calmo",
      },
    ],
    timeline: [
      { id: "t1", date: "19/05", time: "18:30", kind: "registro", text: "Animal desaparecido registrado." },
      { id: "t2", date: "20/05", time: "15:42", kind: "avistamento", text: "Possível avistamento registrado." },
      { id: "t3", date: "21/05", time: "09:18", kind: "avistamento", text: "Novo avistamento registrado." },
    ],
    map: { x: 46, y: 38 },
  },
  {
    id: "thor",
    name: "Thor",
    species: "cachorro",
    breed: "SRD",
    sex: "macho",
    age: "5 anos",
    size: "medio",
    color: "Caramelo",
    status: "reencontrado",
    city: "Belo Horizonte",
    neighborhood: "Savassi",
    distanceKm: 2.4,
    date: "12/05",
    time: "07:10",
    summary: "Caramelo com coleira vermelha. Voltou para casa após um avistamento na feira.",
    description:
      "Thor fugiu durante uma tempestade. Foi reencontrado graças a duas sinalizações da comunidade.",
    photoUrl: thor,
    contactPreference: "chat",
    sightingsCount: 3,
    sightings: [],
    timeline: [
      { id: "t1", date: "12/05", time: "07:10", kind: "registro", text: "Animal desaparecido registrado." },
      { id: "t2", date: "13/05", time: "10:05", kind: "avistamento", text: "Avistamento na feira do bairro." },
      { id: "t3", date: "13/05", time: "19:20", kind: "status", text: "Ocorrência marcada como reencontrada." },
    ],
    map: { x: 66, y: 58 },
  },
  {
    id: "mel",
    name: "Mel",
    species: "gato",
    breed: "SRD",
    sex: "femea",
    age: "2 anos",
    size: "pequeno",
    color: "Laranja",
    status: "avistado",
    city: "Belo Horizonte",
    neighborhood: "Floresta",
    distanceKm: 1.6,
    date: "22/05",
    time: "20:00",
    summary: "Gata laranja avistada em telhados da região. Muito arisca.",
    description: "Mel desapareceu há 4 dias. Já houve um avistamento confirmado por vizinhos.",
    photoUrl: mel,
    contactPreference: "whatsapp-mediado",
    sightingsCount: 1,
    sightings: [
      {
        id: "s3",
        occurrenceId: "mel",
        date: "22/05",
        time: "20:00",
        neighborhood: "Floresta",
        description: "Gata laranja no muro dos fundos, fugiu ao ser chamada.",
        behavior: "Arisca",
      },
    ],
    timeline: [
      { id: "t1", date: "18/05", time: "21:00", kind: "registro", text: "Animal desaparecido registrado." },
      { id: "t2", date: "22/05", time: "20:00", kind: "avistamento", text: "Possível avistamento registrado." },
    ],
    map: { x: 30, y: 66 },
  },
  {
    id: "nina",
    name: "Nina",
    species: "cachorro",
    breed: "Maltês",
    sex: "femea",
    age: "1 ano",
    size: "pequeno",
    color: "Branco",
    status: "encontrado",
    city: "Belo Horizonte",
    neighborhood: "Santa Efigênia",
    distanceKm: 1.2,
    date: "23/05",
    time: "16:45",
    summary: "Cadela branca encontrada em um parque, sem coleira. Está sob cuidados temporários.",
    description:
      "Encontrada assustada perto do portão do parque. Está bem de saúde e aguardando o tutor.",
    photoUrl: nina,
    contactPreference: "email-mediado",
    sightingsCount: 0,
    sightings: [],
    timeline: [
      { id: "t1", date: "23/05", time: "16:45", kind: "registro", text: "Animal encontrado registrado." },
    ],
    map: { x: 58, y: 24 },
  },
  {
    id: "pipoca",
    name: "Pipoca",
    species: "ave",
    breed: "Calopsita",
    sex: "indefinido",
    age: "3 anos",
    size: "pequeno",
    color: "Cinza e amarelo",
    status: "desaparecido",
    city: "Belo Horizonte",
    neighborhood: "Lagoinha",
    distanceKm: 3.1,
    date: "21/05",
    time: "11:20",
    summary: "Calopsita fugiu da gaiola durante a limpeza. Assobia quando chamada.",
    description: "Voa curtas distâncias e costuma pousar em fiações. Responde a assobios.",
    photoUrl: mel,
    contactPreference: "chat",
    sightingsCount: 0,
    sightings: [],
    timeline: [
      { id: "t1", date: "21/05", time: "11:20", kind: "registro", text: "Animal desaparecido registrado." },
    ],
    map: { x: 20, y: 30 },
  },
  {
    id: "bidu",
    name: "Bidu",
    species: "cachorro",
    breed: "SRD",
    sex: "macho",
    age: "8 anos",
    size: "grande",
    color: "Preto e branco",
    status: "obito",
    city: "Belo Horizonte",
    neighborhood: "Barro Preto",
    distanceKm: 4.5,
    date: "10/05",
    summary: "Ocorrência encerrada pela família.",
    description: "Ocorrência encerrada com respeito à família. Mantida apenas para histórico.",
    photoUrl: thor,
    contactPreference: "chat",
    sightingsCount: 1,
    sightings: [],
    timeline: [
      { id: "t1", date: "10/05", time: "08:00", kind: "registro", text: "Animal desaparecido registrado." },
      { id: "t2", date: "14/05", time: "17:00", kind: "status", text: "Ocorrência encerrada." },
    ],
    map: { x: 78, y: 74 },
  },
];

export const demoPets: Pet[] = [
  { id: "p1", name: "Logan", species: "gato", breed: "SRD", age: "3 anos", traits: "Preto, marca branca no peito", notes: "Assusta com barulho", photoUrl: logan },
  { id: "p2", name: "Mel", species: "gato", breed: "SRD", age: "2 anos", traits: "Laranja, olhos verdes", photoUrl: mel },
  { id: "p3", name: "Thor", species: "cachorro", breed: "SRD", age: "5 anos", traits: "Caramelo, coleira vermelha", photoUrl: thor },
];

export const demoNotifications: AppNotification[] = [
  { id: "n1", kind: "avistamento", title: "Novo avistamento", body: "Alguém sinalizou um possível avistamento de Logan próximo ao bairro Centro.", time: "há 12 min", read: false, occurrenceId: "logan" },
  { id: "n2", kind: "proxima", title: "Ocorrência próxima", body: "Um gato encontrado foi registrado a 1,2 km de você.", time: "há 2 h", read: false, occurrenceId: "nina" },
  { id: "n3", kind: "status", title: "Status atualizado", body: "A ocorrência de Thor foi marcada como reencontrada.", time: "ontem", read: true, occurrenceId: "thor" },
];

export const demoUser = {
  name: "Ana Helouise",
  city: "Belo Horizonte",
  memberSince: "Maio de 2026",
  signals: 8,
  photoUrl: "",
};

export const demoAdminStats = {
  activeOccurrences: 34,
  missing: 21,
  found: 9,
  reunited: 12,
  sightings: 57,
  users: 486,
};

export const demoByNeighborhood = [
  { label: "Centro", value: 12 },
  { label: "Savassi", value: 8 },
  { label: "Floresta", value: 6 },
  { label: "Lagoinha", value: 5 },
  { label: "Barro Preto", value: 3 },
];

export const demoBySpecies = [
  { label: "Cachorro", value: 18 },
  { label: "Gato", value: 14 },
  { label: "Ave", value: 3 },
  { label: "Outro", value: 1 },
];

export const demoReports = [
  { id: "d1", target: "Ocorrência #2381", reason: "Foto duplicada de outra ocorrência", status: "aberta", date: "22/05" },
  { id: "d2", target: "Usuário @rvieira", reason: "Contato insistente com tutor", status: "em análise", date: "21/05" },
  { id: "d3", target: "Ocorrência #2290", reason: "Informação falsa de avistamento", status: "resolvida", date: "18/05" },
];
