import React, { useEffect, useState, useMemo } from "react";
import Header from "./../../components/Header";
import Sidebar from "./../../components/Sidebar";
import { useEffectOnce, isObjectEmpty } from "./../../functions";
import { getData, toogleLoading } from "../../redux/slices/dashboardSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  var myChart;
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const dispatch = useDispatch();
  // const [data, setData] = useState({
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //     {
  //       label: "Dataset 2",
  //       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //       borderColor: "rgb(53, 162, 235)",
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // });

  const loading = useSelector((state) => state.Dashboard.loading);

  useEffectOnce(() => {
    dispatch(getData());
    dispatch(toogleLoading(false));
  });
  // useEffect(() => {
  //   dispatch(getData());
  // }, []);

  const data = useSelector((state) => state.Dashboard.data);
  const dt = useSelector((state) => state.Dashboard.dt);
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Laporan 12 Bulan terakhir.",
      },
    },
  };

  // useEffect(() => {
  //   if (!isObjectEmpty(data)) {

  //   }
  //   console.log("data:", data);
  // }, [data]);

  return (
    <header>
      <div className="flex flex-wrap gap-y-2 md:justify-around lg:justify-around">
        <div className="flex">
          <div className="flex justify-center">
            <div className="block p-6 rounded-lg shadow-lg bg-[#F3F4F6] w-96 lg:w-60 md:w-60">
              <h5 className="text-gray-900 text-center text-xl leading-tight font-medium mb-2">
                Surat Masuk
              </h5>
              <p className="text-gray-700 text-7xl text-center mb-4">
                {!isObjectEmpty(dt) ? dt.suratmasuk.total : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-center">
            <div className="block p-6 rounded-lg shadow-lg bg-[#F3F4F6] w-96 lg:w-60 md:w-60">
              <h5 className="text-gray-900 text-center text-xl leading-tight font-medium mb-2">
                Surat di proses
              </h5>
              <p className="text-gray-700 text-7xl text-center mb-4">
                {!isObjectEmpty(dt) ? dt.suratproses.total : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-center">
            <div className="block p-6 h-44 rounded-lg shadow-lg bg-[#F3F4F6] w-96 lg:w-60 md:w-60">
              <h5 className="text-gray-900 text-center text-xl leading-tight font-medium mb-2">
                Surat dibalas
              </h5>
              <p className="text-gray-700 text-7xl text-center mb-4">
                {!isObjectEmpty(dt) ? dt.suratselesai.total : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 p-7">
        <div className="block p-6 rounded-lg shadow-lg bg-[#F3F4F6] w-full">
          <Line options={options} data={data} />
        </div>
      </div>
    </header>
  );
};

export default Dashboard;
