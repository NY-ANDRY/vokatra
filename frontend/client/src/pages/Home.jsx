import { useHeader } from "../contexts/HeaderContext";

const Home = () => {
    const { setHeaderTitle } = useHeader();
    setHeaderTitle('FARMENA');

    return (
        <section id="home" className="max-h-full overflow-auto">
            home
        </section>
    )
}

export default Home;