import { IconSubtask } from "@tabler/icons";

const TotalTaskWidget = () => {
    return (
        <div className="bg-white flex flex-col py-2 px-5 rounded-lg h-full">
            <h3>Total Task</h3>
            <div className="flex items-center justify-between">
                <IconSubtask size={40} />
                <h1 className="flex-1 self-end text-2xl font-bold text-right">
                    10
                </h1>
            </div>
        </div>
    );
};

export default TotalTaskWidget;
