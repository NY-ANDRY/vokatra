import { useNavigate } from "react-router-dom";
import { useHeader } from "../contexts/HeaderContext";

const Home = () => {
    const navigate = useNavigate();

    const { setHeaderTitle } = useHeader();
    setHeaderTitle('FARMENA');

    const handleClick = () => {
        navigate('/products');
    }

    return (
        <section id="home" className="max-h-full h-full overflow-auto">
            <div
                className="w-full h-full flex items-center justify-center bg-cover bg-center p-16 relative"
                style={{ backgroundImage: "url('/assets/img/bg_home.png')" }}
            >
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] z-10"></div>
                <div className="flex w-full flex-col text-white gap-10 pb-28 z-20">
                    <div className="flex text-[58px] font-[i-b]">
                        Bienvenue sur notre boutique agricole
                    </div>
                    <div className="flex w-[800px] font-[i] text-[16px] leading-6 text-neutral-100">
                        Chez Farmena, nous vous proposons une sélection de produits agricoles de qualité, directement issus des producteurs locaux. Que vous soyez un professionnel ou un particulier, vous trouverez tout ce qu’il vous faut pour vos besoins quotidiens. Soutenez l’agriculture locale tout en profitant de produits frais, durables et accessibles.
                    </div>

                    <div className="flex">
                        <div className="flex bg-white hover:bg-gray-100 transition-all text-black font-[i-b] rounded-sm tracking-wide px-8 py-2 cursor-pointer" onClick={handleClick}>
                            VOIR PRODUIT
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;