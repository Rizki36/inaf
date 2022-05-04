import { Task } from "server";

export const mapStatus = (status: Task["status"] = "OPEN") => {
    switch (status) {
        case "OPEN":
            return "Open";
        case "IN_PROGRESS":
            return "In progress";
        case "DONE":
            return "Done";
        default:
            return "Unknown";
    }
};
