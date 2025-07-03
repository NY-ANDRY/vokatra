import { useHeader } from "../contexts/HeaderContext";

const Home = () => {
    const { setHeaderTitle } = useHeader();
    setHeaderTitle('VOKATRA');

    return (
        <section id="home">
            home
        </section>
    )
}

export default Home;