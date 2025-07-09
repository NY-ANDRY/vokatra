import { useNavigate } from "react-router-dom";
import SideBtn from "../components/btn/SibeBtn";
import { useNav } from "../contexts/NavContext";

const SideBar = () => {
    const navigate = useNavigate();
    const { navLocation, setNavLocation } = useNav();

    const dashboard = [
        { label: 'Activity', link: '/dashboard/' },
        { label: 'Products', link: '/products' },
        { label: 'Stock', link: '/stock' }
    ]

    const views = [
        { label: 'commandes', link: '/commande' },
        { label: 'factures', link: '/factures' },
        { label: 'livraisons', link: '/livraisons' },
    ]

    const handleClick = () => {
        setNavLocation('/');
        navigate('/');
    }

    return (
        <div className="w-64 flex flex-col">
            <div className="h-12 text-neutral-900 border-zinc-300 flex font-[i-b] text-xl items-center px-6 border-b-[0.5px] cursor-pointer" onClick={handleClick}>ADMIN</div>
            <div className="border-zinc-300 flex flex-col gap-2 justify-center pb-5 pr-5 pt-4 pl-5 border-b-[0.5px]">
                <div className="text-neutral-400 p-2 font-[i]">Dashboard</div>
                <div className="flex flex-col text-[#00000099] text-sm gap-1 font-[i-m]">
                    {dashboard.map(({ label, link }) => (
                        <SideBtn key={link} label={label} to={link} selected={navLocation === link} onClick={() => setNavLocation(link)} />
                    ))}
                </div>
            </div>
            <div className="border-zinc-300 flex flex-col gap-2 justify-center pb-5 pr-5 pt-4 pl-5 border-b-[0.5px]">
                <div className="text-neutral-400 p-2 font-[i]">Gestion</div>
                <div className="flex flex-col text-[#00000099] text-sm gap-1 font-[i-m]">
                    {views.map(({ label, link }) => (
                        <SideBtn key={link} label={label} to={link} selected={navLocation === link} onClick={() => setNavLocation(link)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
