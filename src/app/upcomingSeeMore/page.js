"use client";

import { useEffect, useState } from "react";
import { MovieCard } from "@/app/_components/MovieCard";
import Header from "../_features/Header";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Ger() {
  const [moviesData, setMoviesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function getData() {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?language=en-US&page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setMoviesData(data?.results);
    setTotalPages(Math.min(data?.total_pages || 1, 500));
  }

  useEffect(() => {
    getData();
  }, [currentPage]);

  const pageItems = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    pageItems.push(1);
    if (startPage > 2) pageItems.push("start-ellipsis");
  }
  for (let page = startPage; page <= endPage; page += 1) {
    pageItems.push(page);
  }
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pageItems.push("end-ellipsis");
    pageItems.push(totalPages);
  }

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
              id={movie.id}
              image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
          ))}
        </div>

        <Pagination className="mt-8 pb-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage((prev) => prev - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {pageItems.map((item, idx) => (
              <PaginationItem key={`${item}-${idx}`}>
                {typeof item === "number" ? (
                  <PaginationLink
                    href="#"
                    isActive={item === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(item);
                    }}
                  >
                    {item}
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis />
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
