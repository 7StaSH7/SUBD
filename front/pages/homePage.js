import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect } from "react";
import { getRoutes } from "../api/getRoutes";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import styles from "../styles/Home.module.css";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Legend
);

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default function HomePage() {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    getRoutes().then((data) => setRoutes(data));
  }, []);
  const groupedRoutes = groupBy(routes, "name");
  const data = {
    labels: Object.keys(groupedRoutes),
    datasets: [
      {
        label: "Routes",
        data: Object.values(groupedRoutes).map((arr) => arr.length),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const columns = [
    { field: "name", header: "Route name" },
    { field: "start", header: "Start time" },
    { field: "end", header: "End time" },
    { field: "bus.name", header: "Bus name" },
    { field: "bus.driver", header: "Bus driver name" },
  ];
  const dynamicColumns = columns.map((col, i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });
  return (
    <div>
      <TabView>
        <TabPanel header="Table">
          <DataTable value={routes}>{dynamicColumns}</DataTable>
        </TabPanel>
        <TabPanel header="Circle graphic">
          <Pie data={data} />
        </TabPanel>
        <TabPanel header="Bar graphic">
          <Bar data={data} />
        </TabPanel>
      </TabView>
    </div>
  );
}
