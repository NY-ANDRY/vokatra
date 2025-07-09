import { useHeader } from "../../contexts/HeaderContext";
import { useNavigate, Link } from "react-router-dom";
import { useNav } from "../../contexts/NavContext";
import Panier_popup from "../Panier_popup";
import { usePanier } from "../../contexts/PanierContext";
import { useMenu } from "../../contexts/MenuContext";
import { Button } from "../../components/Balise";
import Menu from "../Menu";

const Header = () => {
    const navigate = useNavigate();
    const { openPanier, setOpenPanier } = usePanier();
    const { openMenu, setOpenMenu } = useMenu();

    const { headerTitle } = useHeader();
    const { navLocation, setNavLocation } = useNav();

    return (
        <>
            <header className="h-12 flex items-center justify-between gap-24 px-0 border-b-[0.6px] border-zinc-300 text-neutral-400 overflow-hidden">
                <div className="flex items-center text-xs relative h-5 gap-4">
                    <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setOpenMenu(!openMenu) }}>
                        <img src="/assets/svg/menu.svg" className="w-8 " alt="" />
                    </div>
                    <Menu />
                    <Link to={"/"}>
                        <div className="text-neutral-900 font-[i-b] text-sm xl:text-xl" >
                            {headerTitle}
                        </div>
                    </Link>
                </div>

                <div className="hidden xl:flex">

                    <div className="text-gray-500 flex items-center gap-4 pr-2">
                        <Button>
                            <Link to={"/products"} className="cursor-pointer">
                                produits
                            </Link>
                        </Button>
                        <Button>
                            <Link to={"/packs"} className="cursor-pointer">
                                packs
                            </Link>
                        </Button>

                        <div className="theme flex items-center cursor-pointer hover:bg-gray-200 rounded-sm p-2" onClick={() => { setOpenPanier(!openPanier) }} >
                            <img src="/assets/svg/panier.svg" className="w-8" alt="" />
                        </div>

                        <div className="flex z-50">
                            <Panier_popup />
                        </div>
                    </div>

                    <div className="flex items-center pl-4 pr-2 border-l-[1px]">
                        <Link to={"/commandes"} className="p-2 hover:bg-gray-200 cursor-pointer">
                            <img src="/assets/svg/list.svg" className="w-8" alt="" />
                        </Link>
                        <Link to={"/factures"} className="p-2 hover:bg-gray-200 cursor-pointer">
                            <img src="/assets/svg/invoice.svg" className="w-8" alt="" />
                        </Link>
                        <Link to={"/factures"} className="p-2 hover:bg-gray-200 cursor-pointer">
                            <img src="/assets/svg/user.svg" className="w-8" alt="" />
                        </Link>
                    </div>
                </div>

            </header>

            <nav className="fixed xl:hidden bg-white w-full bottom-0 h-12 flex items-center justify-between">

                <div className="flex flex-1 w-full justify-between xl:flex-1">

                    <div className="flex-1 text-gray-500 flex items-center pl-4 gap-2">
                        <div className="p-0">

                            <Link to={"/commandes"} className="px-2 cursor-pointer">
                                commandes
                            </Link>
                        </div>
                        <div className="p-0">
                            <Link to={"/factures"} className="px-2 cursor-pointer">
                                factures
                            </Link>
                        </div>
                    </div>

                    <div className="flex pr-8">
                        <div className="theme flex items-center cursor-pointer hover:bg-gray-200 rounded-sm p-2" onClick={() => { setOpenPanier(!openPanier) }} >
                            <img src="/assets/svg/panier.svg" className="w-8" alt="" />
                        </div>

                        <div className="flex z-50">
                            <Panier_popup />
                        </div>
                    </div>

                </div>

            </nav>
        </>
    );
};

export default Header;