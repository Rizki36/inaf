import MainCard from "@/components/ui-component/cards/MainCard";
import { Button } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import useModal from "hooks/useModal";
import Image from "next/image";
import { FC } from "react";
import TaskWorkerCreateModal from "./TaskWorkerCreateModal";
import TaskWorkerDeleteDialog from "./TaskWorkerDeleteDialog";

const dummy: { id: string; img: string; name: string; position: string }[] = [
    {
        id: "1",
        img: "/avatar.jpg",
        name: "John Doe",
        position: "Developer",
    },
    {
        id: "2",
        img: "/avatar.jpg",
        name: "Jane Doe",
        position: "Developer",
    },
];
const TaskWorkers = () => {
    const modal = useModal(false);
    return (
        <>
            <MainCard
                title={"Task Worker"}
                secondary={
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<IconPlus size={"0.8rem"} />}
                        size="small"
                        onClick={() => modal.toggleModal()}
                    >
                        Add
                    </Button>
                }
            >
                {dummy.map((dt) => (
                    <ItemWorker
                        {...dt}
                        handleRemove={() => {
                            alert(dt.name);
                        }}
                    />
                ))}
            </MainCard>
            <TaskWorkerCreateModal modal={modal} mutate={() => {}} />
        </>
    );
};

type ItemWorkerType = FC<{
    id: string;
    img: string;
    name: string;
    position: string;
    handleRemove: () => void;
}>;
const ItemWorker: ItemWorkerType = ({
    id,
    img,
    name,
    position,
    handleRemove,
}) => {
    return (
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                    <Image src={img} layout="fill" objectFit="cover" />
                </div>
                <div className="ml-5">
                    <h4 className="m-0">{name}</h4>
                    <small>{position}</small>
                </div>
            </div>
            <div>
                <TaskWorkerDeleteDialog id={id} name={name} mutate={() => {}} />
            </div>
        </div>
    );
};

export default TaskWorkers;
