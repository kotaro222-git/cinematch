"use client"

import { ProfileHeader } from "@/components/profile/profile-header"
import { PersonalAwards } from "@/components/profile/personal-awards"
import { MovieCollection } from "@/components/profile/movie-collection"

const TMDB = (path: string) => `https://image.tmdb.org/t/p/w500/${path}`

const profileData = {
  name: "柚木ジャスミン",
  username: "yuzuki_jasmine",
  avatar: "",
  bio: "ホラーとサスペンスが大好き。\n東京生活。週末自宅警備員🎬",
  moviesWatched: 342,
  following: 128,
  followers: 256,
  topCategory: "horror" as const,
  topEmotion: "tension" as const,
  categoryStats: {
    horror: 32,
    romance: 18,
    action: 22,
    scifi: 16,
    comedy: 12,
  } as Record<"horror" | "romance" | "action" | "scifi" | "comedy", number>,
  emotionStats: {
    tension: 95,
    passion: 52,
    energy: 82,
    wonder: 68,
    joy: 58,
  } as Record<"tension" | "passion" | "energy" | "wonder" | "joy", number>,
}

const awards = [
  {
    id: "horror",
    name: "ホラー部門",
    icon: "\u{1F47B}",
    winner: {
      id: "h1",
      title: "Joker",
      poster: TMDB("udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"),
      year: 2019,
    },
    rankings: [
      { id: "h1", title: "Joker", poster: TMDB("udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"), year: 2019 },
      { id: "h2", title: "Hereditary", poster: TMDB("sOuF9KMxI2j2GwZVHPqhTDqsn1d.jpg"), year: 2018 },
      { id: "h3", title: "IT", poster: TMDB("9E2y5Q7WlCVNEhP5GiVT159Ehx1.jpg"), year: 2017 },
      { id: "h4", title: "Midsommar", poster: TMDB("1bty7G3fUWOP9O6YPn2i12Cn0o.jpg"), year: 2019 },
      { id: "h5", title: "A Quiet Place", poster: TMDB("nAU74GmpUk7t5iklEp3nwSrK1GP.jpg"), year: 2018 },
    ],
  },
  {
    id: "romance",
    name: "恋愛部門",
    icon: "\u{1F495}",
    winner: {
      id: "r1",
      title: "La La Land",
      poster: TMDB("uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"),
      year: 2016,
    },
    rankings: [
      { id: "r1", title: "La La Land", poster: TMDB("uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"), year: 2016 },
      { id: "r2", title: "Notting Hill", poster: TMDB("f1gMw3PVicfdZ9dH31iCgG4ayhn.jpg"), year: 1999 },
      { id: "r3", title: "The Notebook", poster: TMDB("rMzlbzJExkFkP2g0N3BHsW3ihIR.jpg"), year: 2004 },
      { id: "r4", title: "Titanic", poster: TMDB("9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"), year: 1997 },
      { id: "r5", title: "Your Name.", poster: TMDB("q719jXXEzOoYaps6babgKnONONX.jpg"), year: 2016 },
    ],
  },
  {
    id: "action",
    name: "アクション部門",
    icon: "\u{1F4A5}",
    winner: {
      id: "a1",
      title: "Leon: The Professional",
      poster: TMDB("yI6X2cCM5YPJtxMhUd3dPGqDAhw.jpg"),
      year: 1994,
    },
    rankings: [
      { id: "a1", title: "Leon: The Professional", poster: TMDB("yI6X2cCM5YPJtxMhUd3dPGqDAhw.jpg"), year: 1994 },
      { id: "a2", title: "John Wick", poster: TMDB("fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"), year: 2014 },
      { id: "a3", title: "Mission: Impossible", poster: TMDB("2wiZ6Jsvf3caW9yQkO3ZsWTp5So.jpg"), year: 1996 },
      { id: "a4", title: "The Dark Knight", poster: TMDB("qJ2tW6WMUDux911r6m7haRef0WH.jpg"), year: 2008 },
      { id: "a5", title: "Kill Bill", poster: TMDB("2yBNZmlxCL86Frw4gyBb0zWV1kP.jpg"), year: 2003 },
    ],
  },
  {
    id: "sf",
    name: "SF部門",
    icon: "\u{1F680}",
    winner: {
      id: "s1",
      title: "Interstellar",
      poster: TMDB("gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"),
      year: 2014,
    },
    rankings: [
      { id: "s1", title: "Interstellar", poster: TMDB("gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"), year: 2014 },
      { id: "s2", title: "Blade Runner 2049", poster: TMDB("gajva2L0rPYkEWjzgFlBXCAVBE5.jpg"), year: 2017 },
      { id: "s3", title: "The Matrix", poster: TMDB("f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"), year: 1999 },
      { id: "s4", title: "DUNE", poster: TMDB("d5NXSklXo0qyIYkgV94XAgMIckC.jpg"), year: 2021 },
      { id: "s5", title: "Arrival", poster: TMDB("hLudzvGfpi6JlwUnsNhXwKKg4j.jpg"), year: 2016 },
    ],
  },
  {
    id: "comedy",
    name: "コメディ部門",
    icon: "\u{1F602}",
    winner: {
      id: "c1",
      title: "The Grand Budapest Hotel",
      poster: TMDB("eWdyYQreja6jGC2x8XpkRqMb46t.jpg"),
      year: 2014,
    },
    rankings: [
      { id: "c1", title: "The Grand Budapest Hotel", poster: TMDB("eWdyYQreja6jGC2x8XpkRqMb46t.jpg"), year: 2014 },
      { id: "c2", title: "Parasite", poster: TMDB("7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"), year: 2019 },
      { id: "c3", title: "Ted", poster: TMDB("q3jHCb4dMfYF6ojsKu4dO7kvcSR.jpg"), year: 2012 },
      { id: "c4", title: "Amelie", poster: TMDB("f0uorE2LR6eLiddTuGS1oGOFcFx.jpg"), year: 2001 },
      { id: "c5", title: "Shaun of the Dead", poster: TMDB("efuNgD2aDALiEG0l60vjw5pQk8.jpg"), year: 2004 },
    ],
  },
]

const watchedMovies = [
  { id: "w1", title: "La La Land", image: TMDB("uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"), userComment: "A beautiful love letter to dreamers." },
  { id: "w2", title: "Interstellar", image: TMDB("gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"), userComment: "Hans Zimmer's score is transcendent." },
  { id: "w3", title: "Parasite", image: TMDB("7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"), userComment: "Masterful social commentary." },
  { id: "w4", title: "The Shawshank Redemption", image: TMDB("9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"), userComment: "Timeless. Every rewatch reveals something new." },
  { id: "w5", title: "Pulp Fiction", image: TMDB("d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"), userComment: "Tarantino at his finest." },
  { id: "w6", title: "The Dark Knight", image: TMDB("qJ2tW6WMUDux911r6m7haRef0WH.jpg"), userComment: "Heath Ledger's Joker is legendary." },
  { id: "w7", title: "Fight Club", image: TMDB("pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"), userComment: "Mind-bending from start to finish." },
  { id: "w8", title: "The Matrix", image: TMDB("f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"), userComment: "Revolutionary. Changed cinema forever." },
  { id: "w9", title: "Spirited Away", image: TMDB("39wmItIWsg5sZMyRUHLkWBcuVCM.jpg"), userComment: "Miyazaki's masterpiece. Pure magic." },
]

const watchlistMovies = [
  { id: "wl1", title: "Poor Things", image: TMDB("kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg") },
  { id: "wl2", title: "Dune: Part Two", image: TMDB("8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg") },
  { id: "wl3", title: "Anatomy of a Fall", image: TMDB("kQs6P7bDqYDPvbxfzJTSdKc1PlL.jpg") },
  { id: "wl4", title: "The Zone of Interest", image: TMDB("eUmAVmjqfHlGdGg7LOJFVJzgzgu.jpg") },
  { id: "wl5", title: "All of Us Strangers", image: TMDB("8tdRjODxcfiYMO4h0uAWo8o0UEu.jpg") },
  { id: "wl6", title: "Past Lives", image: TMDB("k3waqVXEqvMfjYiL0APkExTJRGN.jpg") },
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
