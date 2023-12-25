import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";
import { truncateString } from "../utils/truncateString";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
const SavedShow = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideLeft = () => {
    var slider = document.querySelector(`#slider`);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.querySelector(`#slider`);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShow);
    });
  }, [user?.email]);

  const movieID = doc(db, "users", `${user?.email}`);
  const unSaveShow = async (id) => {
    try {
      const result = movies.filter((item) => item.id !== id);
      await updateDoc(movieID, {
        savedShow: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex w-full items-center group">
        <MdChevronLeft
          size={40}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          onClick={slideLeft}
        />
        <div
          id={`slider`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies &&
            movies.map((movie, id) => (
              <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 select-none">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
                  alt={movie.title}
                  className="w-full h-auto block"
                />
                <div>
                  <p className="text-white text-xs md:text-sm whitespace-normal text-center mt-2">
                    {truncateString(movie.title, 30)}
                  </p>
                </div>
                <div className="absolute w-full h-full top-0 left-0 hover:bg-black/80 opacity-0 hover:opacity-100">
                  <p onClick={() => unSaveShow(movie.id)}>
                    <MdClose
                      size={20}
                      className="text-gray-300 absolute top-[10%] right-[5%]"
                    />
                  </p>
                </div>
              </div>
            ))}
        </div>
        <MdChevronRight
          size={40}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          onClick={slideRight}
        />
      </div>
    </>
  );
};

export default SavedShow;
