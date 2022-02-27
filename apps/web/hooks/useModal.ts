import { useEffect, useState, useCallback } from "react";

const useModal = (initValue: boolean) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(initValue);
    }, []);

    const toggleModal = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    return { isOpen, setIsOpen, toggleModal };
};

export default useModal;
