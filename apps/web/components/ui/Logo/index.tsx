import Image from "next/image";
import logo from "assets/images/logo.png";

const Logo = () => {
    return (
        <Image
            src={logo}
            alt="Logo"
            height={50}
            width={100}
            objectFit="contain"
        />
    );
};

export default Logo;
