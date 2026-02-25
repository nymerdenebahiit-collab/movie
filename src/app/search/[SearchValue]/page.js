"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/_features/Header";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function SearchPage() {
  const { SearchValue } = useParams();
  const searchValue = decodeURIComponent(SearchValue || "");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  // 🎬 Search movies
  useEffect(() => {
    if (!searchValue) return;

    fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(
        searchValue
      )}&include_adult=false&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      });
  }, [searchValue, page]);

  // 🎭 Genre list
  useEffect(() => {
    fetch(`${BASE_URL}/genre/movie/list?language=en-US`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <div className="max-w-[1400px] mx-auto mt-6 flex gap-10">
        {/* LEFT CONTENT */}
        <main className="flex-1">
          <h1 className="text-xl font-semibold mb-2">Search results</h1>

          <p className="text-sm text-muted-foreground mb-6">
            {movies.length} results for “{searchValue}” (Page {page} /{" "}
            {totalPages})
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/movie-detail/${movie.id}`}>
                <div className="cursor-pointer">
                  <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/no-image.png"
                      }
                      alt={movie.title}
                      fill
                      className="object-cover hover:scale-105 transition"
                    />
                  </div>

                  <h3 className="mt-2 text-sm font-medium">{movie.title}</h3>

                  <p className="text-xs text-muted-foreground">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-1 border border-border rounded disabled:opacity-40 hover:bg-muted"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">{page}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 border border-border rounded disabled:opacity-40 hover:bg-muted"
            >
              Next
            </button>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-[300px] border-l pl-6">
          <h2 className="font-semibold text-lg mb-1">Search by genre</h2>
          <p className="text-sm text-muted-foreground mb-4">
            See lists of movies by genre
          </p>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/genres/${genre.id}`}
                className="px-3 py-1.5 text-sm rounded-full border border-border hover:bg-muted"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
