import MainCard from "@/components/ui/MainCard";
import { useTaskWorkersByTaskId } from "@/libs/query/taskWorkerQuery";
import { Button } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import useModal from "hooks/useModal";
import Image from "next/image";
import { FC } from "react";
import TaskWorkerCreateModal from "./TaskWorkerCreateModal";
import TaskWorkerDeleteDialog from "./TaskWorkerDeleteDialog";

const TaskWorkers: FC<{ taskId: string }> = ({ taskId }) => {
    const modal = useModal(false);
    const { data, isError, isLoading, mutate } = useTaskWorkersByTaskId(taskId);

    const existingWorkerIds = data?.data?.map((i) => i.userId) || [];

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
                {!isError &&
                    !isLoading &&
                    data.data.map((dt) => (
                        <ItemWorker
                            key={dt.id}
                            id={dt.id}
                            img={"/avatar.jpg"}
                            name={dt.user.name}
                            position={dt.user?.Position?.name}
                            mutate={mutate}
                        />
                    ))}
            </MainCard>
            {!isError && !isLoading && (
                <TaskWorkerCreateModal
                    taskId={taskId}
                    modal={modal}
                    mutate={mutate}
                    existingWorkerIds={existingWorkerIds}
                />
            )}
        </>
    );
};

type ItemWorkerType = FC<{
    id: string;
    img: string;
    name: string;
    position: string;
    mutate: () => void;
}>;
const ItemWorker: ItemWorkerType = ({ id, img, name, position, mutate }) => {
    return (
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                    <Image
                        src={img}
                        layout="fill"
                        objectFit="cover"
                        alt="image"
                    />
                </div>
                <div className="ml-5">
                    <h4 className="m-0">{name}</h4>
                    <small>{position}</small>
                </div>
            </div>
            <div>
                <TaskWorkerDeleteDialog id={id} name={name} mutate={mutate} />
            </div>
        </div>
    );
};

export default TaskWorkers;
