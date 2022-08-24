export default function Search(props: any) {
    console.log(props.anime);

};

export const getServerSideProps = async () => {
    const res = await fetch("https://api.jikan.moe/v4/anime?letter=sword");
    const data = res.json();

    return {
        props: {
            anime: data
        }
    }
}; 