"use client";

import { useEffect, useState } from "react";
import { Footer } from "../../_features/Footer";
import Header from "../../_features/Header";
import { useParams } from "next/navigation";
import MovieD from "@/app/_components/MovieD";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Page() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  async function getData() {
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    };

    const [detailResponse, videosResponse] = await Promise.all([
      fetch(`${BASE_URL}/movie/${id}?language=en-US`, { headers }),
      fetch(`${BASE_URL}/movie/${id}/videos?language=en-US`, { headers }),
    ]);

    const detail = await detailResponse.json();
    const videos = await videosResponse.json();
    const trailer =
      videos?.results?.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      ) ||
      videos?.results?.find(
        (video) => video.site === "YouTube" && video.type === "Teaser"
      );

    setDetailData(detail);
    setTrailerKey(trailer?.key || null);
  }

  useEffect(() => {
    if (id) getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {detailData && <MovieD movie={detailData} trailerKey={trailerKey} />}

      <Footer />
    </div>
  );
}
