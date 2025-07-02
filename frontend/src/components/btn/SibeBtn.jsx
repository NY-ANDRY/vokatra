import { Link } from "react-router-dom";


const SideBtn = ({ label, to, selected, ...rest }) => {
    return (
        <Link to={to}>
            <div className="flex items-center p-2 rounded-sm hover:bg-neutral-200 cursor-pointer h-8 transition-all" style={{ color: selected && '#222222', backgroundColor: selected && 'rgba(0, 0, 0, 0.05)' }} {...rest}>
                {label}
            </div>
        </Link>
    );
}

export default SideBtn;