import { useHeader } from "../contexts/HeaderContext";

const Home = () => {
    const { setHeaderTitle } = useHeader();
    setHeaderTitle('stk');

    return (
        <section id="home">
            home
        </section>
    )
}

export default Home;