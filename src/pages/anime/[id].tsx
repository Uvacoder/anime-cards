import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Router from "next/router";

const RandomAnime: NextPage<{ data: any }> = (props) => {
  const animeData = props.data.data;

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  return (
    <>
      {animeData && (
        <div className="grid h-screen place-items-center">
          <AnimeCard anime={animeData} />

          <div className="text-center">
            <button
              type="button"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              onClick={() => Router.push(`/anime/${getRandomInt(1000)}`)}
            >
              Next Anime
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const AnimeCard = ({ anime }: any) => {
  console.log("Coming from AnimeCard: ", anime);
  const tags = anime.genres.map((genre: any, index: number) => {
    return (
      <span
        key={index}
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >
        {`#${genre.name}`}
      </span>
    );
  });

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src={anime.images.jpg.large_image_url}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{anime.title}</div>
        <p className="text-gray-700 text-base">
          {anime.synopsis.substring(0, 180) + "..."}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">{tags}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}: any) => {
  try {
    const { id } = params;
    const result = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);

    const data = await result.json();

    return {
      props: { data },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

export default RandomAnime;
