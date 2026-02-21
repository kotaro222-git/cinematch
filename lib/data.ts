export interface Movie {
  id: string
  title: string
  image: string
  tagline: string
  year?: number
}

export interface User {
  name: string
  avatar: string
  isOnline: boolean
  aura: string
  matchPercentage?: number
}

export interface Conversation {
  id: string
  user: User
  lastMessage: string
  timestamp: string
  isGift: boolean
  movieThumbnail: string
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Blade Runner 2049",
    image: "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "The key to the future is finally unearthed.",
    year: 2017,
  },
  {
    id: "2",
    title: "Interstellar",
    image: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    year: 2014,
  },
  {
    id: "3",
    title: "Parasite",
    image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Act like you own the place.",
    year: 2019,
  },
  {
    id: "4",
    title: "La La Land",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Here's to the fools who dream.",
    year: 2016,
  },
  {
    id: "5",
    title: "The Grand Budapest Hotel",
    image: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "A perfect holiday without leaving home.",
    year: 2014,
  },
  {
    id: "6",
    title: "Drive",
    image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "There are no clean getaways.",
    year: 2011,
  },
  {
    id: "7",
    title: "Arrival",
    image: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Why are they here?",
    year: 2016,
  },
  {
    id: "8",
    title: "Moonlight",
    image: "https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "This is the story of a lifetime.",
    year: 2016,
  },
  {
    id: "9",
    title: "Hereditary",
    image: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Every family tree hides a secret.",
    year: 2018,
  },
  {
    id: "10",
    title: "Dune",
    image: "https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "It begins.",
    year: 2021,
  },
]

export const conversations: Conversation[] = [
  {
    id: "1",
    user: {
      name: "Haruki",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
      isOnline: true,
      aura: "Cinephile / Sci-Fi Enthusiast",
      matchPercentage: 92,
    },
    lastMessage: "Have you seen Blade Runner 2049?",
    timestamp: "2m ago",
    isGift: false,
    movieThumbnail: "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: "2",
    user: {
      name: "Sakura",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
      isOnline: true,
      aura: "Romantic Comedy Lover",
      matchPercentage: 85,
    },
    lastMessage: "La La Land is a masterpiece!",
    timestamp: "15m ago",
    isGift: true,
    movieThumbnail: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: "3",
    user: {
      name: "Kenji",
      avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200",
      isOnline: false,
      aura: "Horror Aficionado",
      matchPercentage: 78,
    },
    lastMessage: "That twist ending though...",
    timestamp: "1h ago",
    isGift: false,
    movieThumbnail: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: "4",
    user: {
      name: "Mika",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
      isOnline: true,
      aura: "Indie Film Curator",
      matchPercentage: 88,
    },
    lastMessage: "Check out this indie gem I found",
    timestamp: "3h ago",
    isGift: false,
    movieThumbnail: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: "5",
    user: {
      name: "Ren",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200",
      isOnline: false,
      aura: "Documentary Enthusiast",
      matchPercentage: 71,
    },
    lastMessage: "This documentary changed my perspective",
    timestamp: "5h ago",
    isGift: true,
    movieThumbnail: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
]
