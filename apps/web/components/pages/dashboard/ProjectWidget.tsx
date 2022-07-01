import { setProject } from "@/configs/redux/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/configs/redux/hooks";
import { useProjects } from "@/libs/query/projectQuery";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import { useEffect } from "react";

const ProjectWidget = () => {
    const dispatch = useAppDispatch();

    const { currentProject } = useAppSelector((state) => state.dashboard);

    // TODO : create endpoint dashboard
    // const { data, isError, isLoading } = useDashboard(currentProject);

    const { data: project } = useProjects({
        perPage: -1,
        page: 1,
    });

    useEffect(() => {
        if (!currentProject && project?.data?.length) {
            console.log("object");
            dispatch(setProject(project.data[0].id));
        }

        // TODO : when its fist load update selected project from result of dashboard query
        // if (data) {
        //     dispatch(setProject(data.id));
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project?.data]);

    const handleChange = (direction: "next" | "back" = "next") => {
        /** current selected project index */
        const currentIndex = project.data.findIndex(
            (project) => project.id === currentProject
        );

        let nextIndex: number;

        if (direction === "next") {
            nextIndex = currentIndex + 1;
            /** set to first project when next index greather then last project index */
            if (nextIndex > project.data.length - 1) nextIndex = 0;
        } else {
            nextIndex = currentIndex - 1;
            /** set to end project when next index less then 0 */
            if (nextIndex < 0) nextIndex = project.data.length - 1;
        }

        /** update selected project */
        dispatch(setProject(project?.data[nextIndex]?.id));
    };

    return (
        <div className="bg-violet-800 text-white py-2 px-7 rounded-lg h-full min-h-fit">
            <div className="flex items-center justify-between">
                <h3>Project</h3>
                <div className="flex items-center gap-x-1">
                    <ButtonBase
                        onClick={() => handleChange("back")}
                        sx={{ borderRadius: "12px" }}
                    >
                        <Avatar
                            variant="rounded"
                            sx={{
                                width: 30,
                                height: 30,
                                background: "none",
                            }}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Avatar>
                    </ButtonBase>
                    <ButtonBase
                        onClick={() => handleChange("next")}
                        sx={{ borderRadius: "12px" }}
                    >
                        <Avatar
                            variant="rounded"
                            sx={{
                                width: 30,
                                height: 30,
                                background: "none",
                            }}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Avatar>
                    </ButtonBase>
                </div>
            </div>

            <div className="relative w-full h-16 overflow-x-hidden">
                {project &&
                    project.data.map((pr) => (
                        <h1
                            key={pr.id}
                            style={{
                                transform:
                                    pr.id !== currentProject
                                        ? `translateX(-100%)`
                                        : "",
                            }}
                            className={`transition-all ease-in-out duration-500 absolute inset-0`}
                        >
                            {pr.name}
                        </h1>
                    ))}
            </div>
        </div>
    );
};

export default ProjectWidget;
