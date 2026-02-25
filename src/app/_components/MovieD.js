"use client";

import { useState } from "react";
import Image from "next/image";

export default function MovieD({ movie, trailerKey }) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Title + Rating */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <div className="text-lg">⭐ {movie.vote_average?.toFixed(1)} / 10</div>
      </div>

      <p className="text-muted-foreground mt-2">
        {movie.release_date} · {movie.runtime} min
      </p>

      {trailerKey && (
        <button
          onClick={() => setIsTrailerOpen(true)}
          className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          Watch Trailer
        </button>
      )}

      {/* Images */}
      <div className="flex gap-6 mt-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
          width={260}
          height={390}
          className="rounded-lg"
        />

        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
          width={800}
          height={390}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Genres */}
      <div className="flex flex-wrap gap-2 mt-6">
        {movie.genres?.map((genre) => (
          <span
            key={genre.id}
            className="border px-4 py-1 rounded-full text-sm"
          >
            {genre.name}
          </span>
        ))}
      </div>

      {/* Overview */}
      <p className="mt-6 text-muted-foreground leading-relaxed">{movie.overview}</p>

      {/* Extra info */}
      <div className="mt-6 text-sm text-muted-foreground">
        <p>
          <strong>Status:</strong> {movie.status}
        </p>
        <p>
          <strong>Language:</strong> {movie.original_language}
        </p>
        <p>
          <strong>Budget:</strong> ${movie.budget?.toLocaleString()}
        </p>
      </div>

      {isTrailerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute top-2 right-3 z-10 text-white text-xl"
            >
              x
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`${movie.title} trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
