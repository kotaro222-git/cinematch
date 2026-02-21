"use client"

import { ProfileHeader } from "@/components/profile/profile-header"
import { PersonalAwards } from "@/components/profile/personal-awards"
import { MovieCollection } from "@/components/profile/movie-collection"

const profileData = {
  name: "Jasmine Yuzuki",
  username: "yuzuki_jasmine",
  avatar: "",
  bio: "Horror and suspense enthusiast.\nWeekend movie marathon specialist.",
  moviesWatched: 342,
  following: 128,
  followers: 256,
}

const awards = [
  {
    id: "horror",
    name: "Horror",
    icon: "\u{1F47B}",
    winner: {
      id: "h1",
      title: "Joker",
      poster: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600",
      year: 2019,
    },
    rankings: [
      { id: "h1", title: "Joker", poster: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2019 },
      { id: "h2", title: "Hereditary", poster: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2018 },
      { id: "h3", title: "IT", poster: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2017 },
      { id: "h4", title: "Midsommar", poster: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2019 },
      { id: "h5", title: "A Quiet Place", poster: "https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2018 },
    ],
  },
  {
    id: "romance",
    name: "Romance",
    icon: "\u{1F495}",
    winner: {
      id: "r1",
      title: "La La Land",
      poster: "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600",
      year: 2016,
    },
    rankings: [
      { id: "r1", title: "La La Land", poster: "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2016 },
      { id: "r2", title: "Notting Hill", poster: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 1999 },
      { id: "r3", title: "The Notebook", poster: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2004 },
      { id: "r4", title: "Titanic", poster: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 1997 },
      { id: "r5", title: "Your Name.", poster: "https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2016 },
    ],
  },
  {
    id: "action",
    name: "Action",
    icon: "\u{1F4A5}",
    winner: {
      id: "a1",
      title: "Leon: The Professional",
      poster: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600",
      year: 1994,
    },
    rankings: [
      { id: "a1", title: "Leon: The Professional", poster: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 1994 },
      { id: "a2", title: "John Wick", poster: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2014 },
      { id: "a3", title: "Mission: Impossible", poster: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 1996 },
      { id: "a4", title: "The Dark Knight", poster: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2008 },
      { id: "a5", title: "Kill Bill", poster: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2003 },
    ],
  },
  {
    id: "sf",
    name: "Sci-Fi",
    icon: "\u{1F680}",
    winner: {
      id: "s1",
      title: "Interstellar",
      poster: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600",
      year: 2014,
    },
    rankings: [
      { id: "s1", title: "Interstellar", poster: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2014 },
      { id: "s2", title: "Blade Runner 2049", poster: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2017 },
      { id: "s3", title: "The Matrix", poster: "https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 1999 },
      { id: "s4", title: "DUNE", poster: "https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2021 },
      { id: "s5", title: "Arrival", poster: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2016 },
    ],
  },
  {
    id: "comedy",
    name: "Comedy",
    icon: "\u{1F602}",
    winner: {
      id: "c1",
      title: "The Grand Budapest Hotel",
      poster: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600",
      year: 2014,
    },
    rankings: [
      { id: "c1", title: "The Grand Budapest Hotel", poster: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2014 },
      { id: "c2", title: "Parasite", poster: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2019 },
      { id: "c3", title: "Ted", poster: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2012 },
      { id: "c4", title: "Amelie", poster: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2001 },
      { id: "c5", title: "Shaun of the Dead", poster: "https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=600", year: 2004 },
    ],
  },
]

const watchedMovies = [
  { id: "w1", title: "La La Land", image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400", userComment: "A beautiful love letter to dreamers." },
  { id: "w2", title: "Interstellar", image: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=400", userComment: "Hans Zimmer's score is transcendent." },
  { id: "w3", title: "Parasite", image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400", userComment: "Masterful social commentary." },
  { id: "w4", title: "The Shawshank Redemption", image: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=400", userComment: "Timeless. Every rewatch reveals something new." },
  { id: "w5", title: "Pulp Fiction", image: "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=400", userComment: "Tarantino at his finest." },
  { id: "w6", title: "The Dark Knight", image: "https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=400", userComment: "Heath Ledger's Joker is legendary." },
  { id: "w7", title: "Fight Club", image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400", userComment: "Mind-bending from start to finish." },
  { id: "w8", title: "The Matrix", image: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=400", userComment: "Revolutionary. Changed cinema forever." },
  { id: "w9", title: "Spirited Away", image: "https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=400", userComment: "Miyazaki's masterpiece. Pure magic." },
]

const watchlistMovies = [
  { id: "wl1", title: "Poor Things", image: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "wl2", title: "Dune: Part Two", image: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "wl3", title: "Anatomy of a Fall", image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "wl4", title: "The Zone of Interest", image: "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "wl5", title: "All of Us Strangers", image: "https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "wl6", title: "Past Lives", image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400" },
]

export function ProfileScreen() {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-background">
      <ProfileHeader {...profileData} />
      <PersonalAwards awards={awards} />
      <MovieCollection watched={watchedMovies} watchlist={watchlistMovies} />
    </div>
  )
}
