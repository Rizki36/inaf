import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TaskProgressWidget = () => {
    return (
        <div className="bg-white flex flex-col items-center py-5 px-5 rounded-lg h-full">
            <div id="chart">
                <Chart
                    series={[75]}
                    height={350}
                    type="radialBar"
                    options={{
                        chart: {
                            height: 350,
                            type: "radialBar",
                            toolbar: {
                                show: true,
                            },
                        },
                        plotOptions: {
                            radialBar: {
                                startAngle: -135,
                                endAngle: 225,
                                hollow: {
                                    margin: 0,
                                    size: "70%",
                                    background: "#fff",
                                    image: undefined,
                                    imageOffsetX: 0,
                                    imageOffsetY: 0,
                                    position: "front",
                                    dropShadow: {
                                        enabled: true,
                                        top: 3,
                                        left: 0,
                                        blur: 4,
                                        opacity: 0.24,
                                    },
                                },
                                track: {
                                    background: "#fff",
                                    strokeWidth: "67%",
                                    margin: 0, // margin is in pixels
                                    dropShadow: {
                                        enabled: true,
                                        top: -3,
                                        left: 0,
                                        blur: 4,
                                        opacity: 0.35,
                                    },
                                },

                                dataLabels: {
                                    show: true,
                                    name: {
                                        offsetY: -10,
                                        show: true,
                                        color: "#888",
                                        fontSize: "17px",
                                    },
                                    value: {
                                        // @ts-ignore
                                        formatter: function (val) {
                                            return parseInt(val + "");
                                        },
                                        color: "#111",
                                        fontSize: "36px",
                                        show: true,
                                    },
                                },
                            },
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                shade: "dark",
                                type: "horizontal",
                                shadeIntensity: 0.5,
                                gradientToColors: ["#ABE5A1"],
                                inverseColors: true,
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [0, 100],
                            },
                        },
                        stroke: {
                            lineCap: "round",
                        },
                        labels: ["Percent"],
                    }}
                />
            </div>
            <h2>Task Progress</h2>
        </div>
    );
};

export default TaskProgressWidget;
