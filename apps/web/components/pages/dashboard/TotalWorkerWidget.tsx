import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const TotalWorkerWidget = ({ totalWorker = 0 }) => {
    return (
        <div className="bg-white flex flex-col py-2 px-5 rounded-lg h-full">
            <h3>User In Project</h3>
            <div className="flex items-center justify-between w-full">
                <AvatarGroup>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24 }}
                    />
                    <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                        sx={{ width: 24, height: 24 }}
                    />
                    <Avatar
                        alt="Agnes Walker"
                        src="/static/images/avatar/4.jpg"
                        sx={{ width: 24, height: 24 }}
                    />
                    <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                        sx={{ width: 24, height: 24 }}
                    />
                </AvatarGroup>
                <h1 className="flex-1 self-end text-2xl font-bold text-right">
                    {totalWorker}
                </h1>
            </div>
        </div>
    );
};

export default TotalWorkerWidget;
