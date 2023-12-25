import React, { useState } from "react";
import { truncateString } from "../utils/truncateString";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Movie = ({ movie }) => {
  const { user } = UserAuth();
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShow: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 select-none">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
        alt={movie.title}
        className="w-full h-auto block"
      />
      <div>
        <p className="text-white text-xs md:text-sm whitespace-normal text-center mt-2">
          {truncateString(movie.title, 30)}
        </p>
      </div>
      <div className="absolute w-full h-full top-0 left-0 hover:bg-black/80 opacity-0 hover:opacity-100">
        <p onClick={saveShow}>
          {like ? (
            <FaHeart
              size={20}
              className="text-gray-300 absolute top-[10%] left-[5%]"
              onClick={() => setLike(false)}
            />
          ) : (
            <FaRegHeart
              size={20}
              className="text-gray-300 absolute top-[10%] left-[5%]"
              onClick={() => setLike(true)}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
