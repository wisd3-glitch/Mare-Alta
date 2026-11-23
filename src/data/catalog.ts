export type CategoryId =
  | "fiction"
  | "nonfiction"
  | "portuguese"
  | "children"
  | "poetry";

export type CoverTone = "blue" | "ink" | "accent" | "paper" | "deep";
export type CoverLayout = "band" | "center" | "rule" | "block";

export type Book = {
  id: string;
  title: string;
  author: string;
  category: CategoryId;
  price: number;
  language: "Portuguese" | "English" | "Bilingual";
  description: string;
  tone: CoverTone;
  layout: CoverLayout;
  featured?: boolean;
};

export type StaffPick = {
  bookId: string;
  bookseller: string;
  role: string;
  note: string;
};

export type ShopEvent = {
  id: string;
  title: string;
  pt: string;
  dateLabel: string;
  day: string;
  month: string;
  time: string;
  detail: string;
  meta: string;
  kind: "reading" | "club" | "children" | "visit";
};

export const CATEGORIES: { id: "all" | CategoryId; en: string; pt: string }[] = [
  { id: "all", en: "All", pt: "Tudo" },
  { id: "fiction", en: "Fiction", pt: "Ficção" },
  { id: "nonfiction", en: "Non-fiction", pt: "Não-ficção" },
  { id: "portuguese", en: "Portuguese authors", pt: "Autores portugueses" },
  { id: "children", en: "Children", pt: "Infantil" },
  { id: "poetry", en: "Poetry", pt: "Poesia" },
];

export const BOOKS: Book[] = [
  {
    id: "the-salt-ledger",
    title: "The Salt Ledger",
    author: "Ines Carvalho",
    category: "fiction",
    price: 16.9,
    language: "English",
    tone: "blue",
    layout: "band",
    featured: true,
    description:
      "A family keeps the river’s debts in a blue notebook. When the pages swell, nobody agrees what was written.",
  },
  {
    id: "houses-of-the-tagus",
    title: "Houses of the Tagus",
    author: "Rui Matos",
    category: "nonfiction",
    price: 22,
    language: "English",
    tone: "ink",
    layout: "rule",
    featured: true,
    description:
      "A walk along the buildings that face the water, and the people who would not leave them when the rent changed.",
  },
  {
    id: "night-ferry",
    title: "Night Ferry",
    author: "Clara Mendes",
    category: "portuguese",
    price: 14.5,
    language: "Portuguese",
    tone: "deep",
    layout: "center",
    featured: true,
    description:
      "A novella set on the last boat across the river, told between one departure and the lights of the other bank.",
  },
  {
    id: "the-small-lighthouse",
    title: "The Small Lighthouse",
    author: "Tom Hale",
    category: "children",
    price: 12,
    language: "Bilingual",
    tone: "accent",
    layout: "block",
    featured: true,
    description:
      "A lighthouse that only lights for readers who stay to the last page. For reading aloud, slowly.",
  },
  {
    id: "tide-tables",
    title: "Tide Tables",
    author: "Marta Sousa",
    category: "poetry",
    price: 11.5,
    language: "Bilingual",
    tone: "paper",
    layout: "rule",
    featured: true,
    description:
      "Short poems timed to the river — one for each hour the shop is open, and one for after we lock the door.",
  },
  {
    id: "a-year-in-alfama",
    title: "A Year in Alfama",
    author: "Jonas Reid",
    category: "nonfiction",
    price: 19.9,
    language: "English",
    tone: "accent",
    layout: "band",
    featured: true,
    description:
      "An expat’s year of staircases, festas, and the neighbour who lent him books instead of directions.",
  },
  {
    id: "the-blue-tile",
    title: "The Blue Tile",
    author: "Beatriz Nunes",
    category: "fiction",
    price: 15.5,
    language: "English",
    tone: "blue",
    layout: "center",
    description:
      "A restorer in Mouraria finds a tile that does not match any pattern book. She keeps it anyway.",
  },
  {
    id: "salt-on-the-stairs",
    title: "Salt on the Stairs",
    author: "Pedro Lemos",
    category: "portuguese",
    price: 17,
    language: "Portuguese",
    tone: "ink",
    layout: "block",
    description:
      "Stories from a building where every landing has a different radio station and the same view of cranes.",
  },
  {
    id: "what-the-gulls-know",
    title: "What the Gulls Know",
    author: "Helen Park",
    category: "children",
    price: 11,
    language: "Bilingual",
    tone: "paper",
    layout: "center",
    description:
      "Two children trade a sandwich for a gull’s secret. It is mostly about sharing, and a little about chips.",
  },
  {
    id: "marginal-notes",
    title: "Marginal Notes",
    author: "Sofia Almeida",
    category: "poetry",
    price: 13,
    language: "Portuguese",
    tone: "deep",
    layout: "rule",
    description:
      "Poems written in the margins of other books, then copied out before the library asked for them back.",
  },
  {
    id: "the-evening-catalogue",
    title: "The Evening Catalogue",
    author: "Ines Carvalho",
    category: "fiction",
    price: 18.4,
    language: "English",
    tone: "paper",
    layout: "band",
    description:
      "A bookseller stays after closing to write descriptions of books that do not exist yet. One of them arrives.",
  },
  {
    id: "kitchen-portuguese",
    title: "Kitchen Portuguese",
    author: "Rui Matos",
    category: "nonfiction",
    price: 21,
    language: "Bilingual",
    tone: "accent",
    layout: "block",
    description:
      "Recipes only as far as the story needs them. The rest is who taught him the verb for ‘simmer’.",
  },
  {
    id: "alfama-after-rain",
    title: "Alfama After Rain",
    author: "Clara Mendes",
    category: "portuguese",
    price: 14.9,
    language: "Portuguese",
    tone: "blue",
    layout: "band",
    description:
      "Three days in a borrowed flat, a stuck window, and a neighbour who knocks with soup and a novel.",
  },
  {
    id: "paper-boats",
    title: "Paper Boats",
    author: "Tom Hale",
    category: "children",
    price: 10.5,
    language: "Bilingual",
    tone: "deep",
    layout: "center",
    description:
      "How to fold a boat that can survive the fountain in the square. Includes the versions that sink.",
  },
  {
    id: "high-water",
    title: "High Water",
    author: "Marta Sousa",
    category: "poetry",
    price: 12.5,
    language: "English",
    tone: "ink",
    layout: "block",
    description:
      "A long poem in short lines about the evening the shop is fullest, which is also when the river is.",
  },
  {
    id: "remote-from-lisbon",
    title: "Remote from Lisbon",
    author: "Jonas Reid",
    category: "nonfiction",
    price: 18,
    language: "English",
    tone: "paper",
    layout: "rule",
    description:
      "Notes on working from a table by the window while the tram argues with itself outside.",
  },
];

export const STAFF_PICKS: StaffPick[] = [
  {
    bookId: "the-salt-ledger",
    bookseller: "Leonor Viana",
    role: "Opens the shop",
    note: "I kept rereading the chapter where the notebook gets wet and the numbers blur. It is a family story, but it is really about what a city remembers when the tide comes in.",
  },
  {
    bookId: "night-ferry",
    bookseller: "Tomás Ribeiro",
    role: "Thursday nights",
    note: "Clara writes the way the boat sounds: low, and then suddenly close. I finished it on the 22:30 and missed my stop, which is the highest compliment I give.",
  },
  {
    bookId: "tide-tables",
    bookseller: "Amélia Costa",
    role: "Story hour",
    note: "Marta can make an hour of the day feel like a room. I leave this by the till and people buy it because a stranger read one poem out loud and the shop went quiet.",
  },
  {
    bookId: "houses-of-the-tagus",
    bookseller: "Leonor Viana",
    role: "Opens the shop",
    note: "Rui is opinionated about balconies, and he is right. If you walk the river after this, you will start looking up — which is the point of a bookshop that is not a warehouse.",
  },
  {
    bookId: "the-small-lighthouse",
    bookseller: "Tomás Ribeiro",
    role: "Thursday nights",
    note: "I am not the children’s bookseller and I still read this to my nephew twice. The lighthouse refuses to shine for people who skip the last page. He did not skip.",
  },
  {
    bookId: "a-year-in-alfama",
    bookseller: "Amélia Costa",
    role: "Story hour",
    note: "Jonas arrived not knowing which hill was which. The book is funny without being unkind, and the neighbour with the spare keys is my favourite person in it.",
  },
];

export const EVENTS: ShopEvent[] = [
  {
    id: "reading-26",
    title: "Thursday reading night",
    pt: "Noite de leituras",
    dateLabel: "Thursday 26 November",
    day: "26",
    month: "Nov",
    time: "19:00",
    kind: "reading",
    meta: "Free entry",
    detail:
      "Two local authors read for 15 minutes each, then questions. Upstairs, about thirty chairs. Come early if you want to sit.",
  },
  {
    id: "story-28",
    title: "Children’s story hour",
    pt: "Hora do conto",
    dateLabel: "Saturday 28 November",
    day: "28",
    month: "Nov",
    time: "11:00",
    kind: "children",
    meta: "Portuguese this week",
    detail:
      "Saturday mornings, in Portuguese and English alternately. This Saturday is Portuguese. Cushions on the floor, books after.",
  },
  {
    id: "poems-3",
    title: "Tide Tables, read aloud",
    pt: "Poemas em voz alta",
    dateLabel: "Thursday 3 December",
    day: "03",
    month: "Dec",
    time: "19:00",
    kind: "reading",
    meta: "Free entry",
    detail:
      "Marta Sousa reads from Tide Tables and leaves time for one poem from the room. No need to bring the book, though the till will have it.",
  },
  {
    id: "story-5",
    title: "Children’s story hour",
    pt: "Hora do conto",
    dateLabel: "Saturday 5 December",
    day: "05",
    month: "Dec",
    time: "11:00",
    kind: "children",
    meta: "English this week",
    detail:
      "The Small Lighthouse, in English, with the Portuguese on the facing page if a parent wants to take over.",
  },
  {
    id: "club-6",
    title: "First Sunday book club",
    pt: "Clube de leitura",
    dateLabel: "Sunday 6 December",
    day: "06",
    month: "Dec",
    time: "17:00",
    kind: "club",
    meta: "The Salt Ledger",
    detail:
      "This month’s book is The Salt Ledger. Bring one page you want to read aloud. The kettle goes on at 16:40.",
  },
  {
    id: "visit-10",
    title: "A conversation on Night Ferry",
    pt: "Conversa",
    dateLabel: "Thursday 10 December",
    day: "10",
    month: "Dec",
    time: "19:00",
    kind: "visit",
    meta: "Free entry",
    detail:
      "Translator Helena Vargas on moving Clara Mendes across the river and into English. Questions welcome, speeches less so.",
  },
  {
    id: "wrap-12",
    title: "Gift wrapping evening",
    pt: "Embrulhos",
    dateLabel: "Saturday 12 December",
    day: "12",
    month: "Dec",
    time: "18:30",
    kind: "visit",
    meta: "Paper, if you ask",
    detail:
      "Bring a book you already own, or choose one here. We wrap. You write the card. Nobody has to explain the plot unless they want to.",
  },
];

export const BOOK_OF_WEEK_ID = "the-salt-ledger";

export const BOOKSELLERS = [
  {
    name: "Leonor Viana",
    role: "Opens the shop",
    initials: "LV",
    bio: "Leonor unlocked the door the first evening and has not quite agreed a closing time since. She reads fiction in both languages and will tell you if a book is doing too much.",
  },
  {
    name: "Tomás Ribeiro",
    role: "Thursday nights",
    initials: "TR",
    bio: "Tomás runs the microphone and the poetry shelf. He believes fifteen minutes is long enough for anyone, including visiting novelists.",
  },
  {
    name: "Amélia Costa",
    role: "Story hour",
    initials: "AC",
    bio: "Amélia does Saturday mornings and the gifts people are nervous about. She will talk you out of a bad present and into a thinner, better one.",
  },
];

export function formatPrice(value: number): string {
  return `€${value.toFixed(2)}`;
}

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.en ?? id;
}

export function getBook(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}

export function booksIn(category: CategoryId): Book[] {
  return BOOKS.filter((b) => b.category === category);
}

export const HOURS = [
  { days: "Monday to Saturday", hours: "10:00 to 20:00" },
  { days: "Sunday", hours: "12:00 to 18:00" },
];

export const SHOP = {
  name: "Maré Alta",
  line: "A bookshop by the Tagus",
  address: ["Rua da Boavista 18", "1200-066 Lisboa", "Portugal"],
  phone: "+351 21 342 1180",
  phoneHref: "tel:+351213421180",
  email: "ola@marealta.pt",
  emailHref: "mailto:ola@marealta.pt",
  neighbourhood: "A short walk uphill from Cais do Sodré.",
};
