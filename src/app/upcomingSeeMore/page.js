"use client";

import { Sum2 } from "@/app/_icon/Sum2";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MovieCard } from "@/app/_components/MovieCard";
import Header from "../_features/Header";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Ger({ type }) {
  const [moviesData, setMoviesData] = useState([]);
  async function getData() {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?language=en-US&page=1`,
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
  }, []);
  console.log(moviesData);
  const router = useRouter();
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <div className="pt-[52px] pl-[80px] pr-[80px]">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[24px] font-semibold not-italic text-foreground">
            Upcoming
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {moviesData?.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              rating={movie.vote_average}
              image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
