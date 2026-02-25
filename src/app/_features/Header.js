"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Sum } from "../_icon/Sum";
import { Moon } from "../_icon/Moon";
import { Kino } from "../_icon/Kino";
import { Sun } from "lucide-react";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState([]); // Animation + Comedy
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [value, setValue] = useState(""); // ✅ Search input state

  // 🎭 Genre list
  useEffect(() => {
    fetch(`${BASE_URL}/genre/movie/list?language=en-US`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  // 🎬 Movies by genre
  useEffect(() => {
    if (selected.length === 0) return;

    fetch(
      `${BASE_URL}/discover/movie?with_genres=${selected.join(
        ","
      )}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, [selected, page]);

  // genre toggle
  const toggleGenre = (id) => {
    setPage(1);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleSearch = () => {
    const keyword = value.trim();
    if (!keyword) return;
    router.push(`/search/${encodeURIComponent(keyword)}`); // 🔹 Search page рүү redirect
  };

  return (
    <header className="w-full h-[59px] bg-background flex justify-center items-center shadow-sm dark:shadow-none border-b border-border">
      <div className="w-[1280px] flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-[#4338CA] italic text-base font-semibold">
          <Kino />
          <span>Movie</span>
        </div>

        {/* Middle */}
        <div className="flex items-center gap-4">
          {/* Genre */}
          <div className="relative">
            <button
              onClick={() => setGenreOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 border border-border rounded-md hover:bg-muted transition"
            >
              <Sum />
              <span className="text-foreground">Genre</span>
            </button>

            {genreOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-lg p-3 flex flex-wrap gap-2 z-50">
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/genres/${genre.id}`}
                    onClick={() => setGenreOpen(false)}
                    className="px-3 py-1.5 text-sm rounded-full border border-border hover:bg-muted"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="flex items-center border border-border rounded-md px-2">
            <input
              type="text"
              value={value} // ✅ State-д холбосон
              onChange={(e) => setValue(e.target.value)}
              className="w-[300px] h-[36px] text-foreground bg-transparent px-2 outline-none"
              placeholder="Search"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter дарахад
            />
            <button className="px-2" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="w-[36px] h-[36px] flex justify-center items-center hover:bg-muted rounded-full transition"
        >
          {isDark ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  );
}
