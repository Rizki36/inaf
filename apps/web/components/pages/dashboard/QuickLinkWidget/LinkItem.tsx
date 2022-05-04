import ButtonBase from "@mui/material/ButtonBase";
import Link from "next/link";
import { FC } from "react";

export type LinkItemType = {
    Icon: FC;
    href: string;
    title: string;
};
const LinkItem: FC<LinkItemType> = ({ Icon, title, href }) => {
    return (
        <Link href={href}>
            <ButtonBase className="bg-white flex items-center justify-between py-5 px-5 rounded-lg w-full">
                <div className="flex items-center">
                    <Icon />
                    <h4 className="my-0 ml-2">{title}</h4>
                </div>
                <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </ButtonBase>
        </Link>
    );
};

export default LinkItem;
