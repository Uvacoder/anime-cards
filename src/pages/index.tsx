import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = (props: any) => {

  const animeCard = (data: any) => {
    const title = data.title;
    const image = data.images.jpg.small_image_url;
    const year = data.year;
    const ep = data.episodes;

    return (
      <div key={data.mal_id} className="grid grid-cols-3 p-2 border hover:bg-gray-200 hover:cursor-pointer">
        <div className="mr-2">
          <img src={image} style={{ width: '50px', height: '75px' }} />
        </div>
        <div className="col-span-2">
          <p className="text-xs">{title}</p>
          <p className="text-xs">Year: {year}</p>
          <p className="text-xs">Episodes: {ep}</p>
        </div>
      </div>
    )
  };

  return (
    <>
      <Head>
        <title>WEEB-IO</title>
        <meta name="description" content="Anime" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-mono text-black-900 text-center text-5xl font-extrabold">WEEB-IO</h1>
        <div className="p-10">
          <form>
            <div className="flex">
              <input type="text" id="search" name="search" className="border-2 border-gray-300 bg-white h-8 px-5 pr-16 rounded text-sm focus:outline-none mr-1" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 font-bold text-white py-1 px-2 rounded">Submit</button>
            </div>
          </form>
        </div>

        <div className="pb-10" />

        <div className="flex gap-4 mt-5">

          <div className="w-64">
            <h1 className="text-center font-bold tracking-tight">UPCOMING</h1>
            {props.upcoming.data.map(animeCard)}
          </div>

          <div className="w-64">
            <h1 className="text-center font-bold tracking-tight">MOST POPULAR</h1>
            {props.popular.data.map(animeCard)}

          </div>

          <div className="w-64">
            <h1 className="text-center font-bold tracking-tight">FAVORITES</h1>
            {props.favorite.data.map(animeCard)}
          </div>

        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  const resFavorite = await fetch('https://api.jikan.moe/v4/top/anime?limit=5&filter=favorite');
  const resPopular = await fetch('https://api.jikan.moe/v4/top/anime?limit=5?&ilter=bypopularity');
  const resUpcoming = await fetch('https://api.jikan.moe/v4/top/anime?limit=5&filter=upcoming');

  const favorite = await resFavorite.json();
  const popular = await resPopular.json();
  const upcoming = await resUpcoming.json();
  return {
    props: {
      favorite,
      popular,
      upcoming,
    }
  }
}

export default Home;
