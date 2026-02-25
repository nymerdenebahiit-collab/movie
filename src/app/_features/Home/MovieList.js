"use client";

import { Sum2 } from "@/app/_icon/Sum2";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MovieCard } from "@/app/_components/MovieCard";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const titles = {
  upcoming: "Upcoming",
  popular: "Popular",
  top_rated: "Top Rated",
};
export function MovieList({ type }) {
  const [moviesData, setMoviesData] = useState([]);
  async function getData() {
    const response = await fetch(
      `${BASE_URL}/movie/${type}?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setMoviesData(data?.results);
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const router = useRouter();
  return (
    <div className="pt-[52px] pl-[80px] pr-[80px]">
      <div className="flex flex-row justify-between items-center mb-4">
        <p className="text-[24px] font-semibold not-italic text-foreground">
          {titles[type]}
        </p>
        <button
          onClick={() => router.push("/upcomingSeeMore")}
          className="flex cursor-pointer items-center justify-center gap-2 w-[130px] h-[40px] text-foreground rounded-xl hover:text-red-500 transition-all duration-200"
        >
          <p>See more</p>
          <Sum2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {moviesData?.slice(0, 10).map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            rating={movie.vote_average}
            id={movie.id}
            image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
}
