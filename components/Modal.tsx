import { modalState, movieState } from "@/atoms/moduleAtom";
import { Movie } from "@/typings";
import { XIcon } from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Element,Genre } from "../typings";
import ReactPlayer from "react-player/lazy";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>()
  const [muted, setMuted] = useState(false)

  console.log(movie);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }

        if (data?.genres) {
          setGenres(data.genres)
        }
    }
    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };

  console.log(trailer)


  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        <button
          onClick={handleClose}
          className="modalButton 
        absolute 
        right-5 
        top-5 
        !z-40
        h-9
        w-9
        border-none bg-[#181818]
        hover:bg-[#8f1313]
        
        "
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div>
        <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
