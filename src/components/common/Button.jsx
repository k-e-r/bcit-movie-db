import { Link } from "react-router";

export const Button = ({ to, children, onClick }) => {
    const className = "px-[10px] py-[5px] text-[24px] rounded-[20px] bg-black text-white hover:bg-white hover:text-black hover:shadow-lg border border-black transition inline-block text-center";

    if (to) {
    return (
        <Link to={to} className={className}>
            {children}
        </Link>
    );
    }

    return (
    <button onClick={onClick} className={className}>
        {children}
    </button>
    );
};