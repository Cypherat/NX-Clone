import Image from "next/image";
import { Movie } from "@/typings";
// import { DocumentData } from "firebase/firestore";

interface Props {
  // when using firebase
  // movie: Movie | DocumentData 
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  return (
    <div className="
    relative h-28 min-w-[180px] 
    cursor-pointer
    transition 
    duration-200ease-out 
    md:h-36 md:min-w-[260px]
    md:hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt="Genre specific Thumbnail"
        sizes="(max-width: 600px) 100vw, 600px"
        priority
      />
    </div>
  );
}

export default Thumbnail;
