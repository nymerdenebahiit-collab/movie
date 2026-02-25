import { useRouter } from "next/navigation";
import Image from "next/image";

export const MovieCard = (props) => {
  const { image, title, rating, id } = props;

  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/movie-detail/${id}`)}
      className="cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <Image
        src={image}
        alt="Movie poster"
        width={230}
        height={340}
        className="object-cover rounded-md"
      />
      <div className="w-[213px] h-[56px] p-2 bg-card text-card-foreground rounded-md shadow-md mt-2 border border-border">
        <p className="text-sm font-medium">
          ⭐️ {rating}/10
        </p>
        <p className="text-base font-semibold">
          {title}
        </p>
      </div>
    </div>
  );
};
