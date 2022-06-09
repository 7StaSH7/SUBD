import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import { getRoutes } from "../api/getRoutes";
import * as XLSX from "xlsx";
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
    getRoutes("start").then((data) => setRoutes(data));
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

  const generalReport = async () => {
    const newData = await getRoutes("start");
    const dataToSave = newData.map((route) => {
      return {
        RouteName: route.name,
        StartTime: route.start,
        EndTime: route.end,
        BusName: route.bus.name,
        BusDriverName: route.bus.driver,
      };
    });
    const ws = XLSX.utils.json_to_sheet(dataToSave);
    const wb = XLSX.utils.book_new();
    const cols = [
      "RouteName",
      "StartTime",
      "EndTime",
      "BusName",
      "BusDriverName",
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Routes");
    XLSX.utils.sheet_add_aoa(ws, [cols], { origin: "A1" });
    ws["!cols"] = cols.map(() => {
      return { wch: 20 };
    });
    XLSX.writeFile(
      wb,
      `${new Date().toLocaleDateString("ru-RU")}_general.xlsx`
    );
  };

  const groupByRoutesReport = async () => {
    let newData = await getRoutes("route.name");

    newData = groupBy(newData, "name");

    let dataToSave = Object.values(newData).map((routes) => {
      return routes.map((route, idx) => {
        if (idx !== 0) delete route.name;
        return route;
      });
    });
    dataToSave = dataToSave.flat().map((route) => {
      return {
        RouteName: route.name,
        StartTime: route.start,
        EndTime: route.end,
        BusName: route.bus.name,
        BusDriverName: route.bus.driver,
      };
    });
    const ws = XLSX.utils.json_to_sheet(dataToSave);
    const wb = XLSX.utils.book_new();
    const cols = [
      "RouteName",
      "StartTime",
      "EndTime",
      "BusName",
      "BusDriverName",
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Grouped routes");
    XLSX.utils.sheet_add_aoa(ws, [cols], { origin: "A1" });
    ws["!cols"] = cols.map(() => {
      return { wch: 20 };
    });
    XLSX.writeFile(
      wb,
      `${new Date().toLocaleDateString("ru-RU")}_group_by_routes.xlsx`
    );
  };

  const groupByDriverReport = async () => {
    let newData = await getRoutes("bus.driver");
    const flatData = newData.map((route) => {
      return {
        id: route.id,
        name: route.name,
        end: route.end,
        start: route.start,
        busName: route.bus.name,
        busDriver: route.bus.driver,
      };
    });

    newData = groupBy(flatData, "busDriver");
    let dataToSave = Object.values(newData).map((routes) => {
      return routes.map((route, idx) => {
        if (idx !== 0) delete route.busDriver;
        return route;
      });
    });

    dataToSave = dataToSave.flat().map((route) => {
      return {
        BusDriverName: route.busDriver,
        BusName: route.busName,
        RouteName: route.name,
        StartTime: route.start,
        EndTime: route.end,
      };
    });
    const ws = XLSX.utils.json_to_sheet(dataToSave);
    const wb = XLSX.utils.book_new();
    const cols = [
      "BusDriverName",
      "BusName",
      "RouteName",
      "StartTime",
      "EndTime",
    ];
    XLSX.utils.book_append_sheet(wb, ws, "Routes");
    XLSX.utils.sheet_add_aoa(ws, [cols], { origin: "A1" });
    ws["!cols"] = cols.map(() => {
      return { wch: 20 };
    });
    XLSX.writeFile(
      wb,
      `${new Date().toLocaleDateString("ru-RU")}_group_by_drivers.xlsx`
    );
  };

  return (
    <div>
      <TabView>
        <TabPanel header="Table">
          <Button
            label="General report"
            className="p-button-outlined"
            onClick={() => generalReport()}
          />
          <Button
            label="Group by routes report"
            className="p-button-outlined"
            onClick={() => groupByRoutesReport()}
            style={{ marginLeft: "20px" }}
          />
          <Button
            label="Group by drivers report"
            className="p-button-outlined"
            onClick={() => groupByDriverReport()}
            style={{ marginLeft: "20px" }}
          />

          <DataTable value={routes} style={{ marginTop: "20px" }}>
            {dynamicColumns}
          </DataTable>
        </TabPanel>
        <TabPanel header="Circle graphic">
          {routes.length ? (
            <div className={styles.graphic}>
              <Pie data={data} />
            </div>
          ) : (
            <h1>No data</h1>
          )}
        </TabPanel>
        <TabPanel header="Bar graphic">
          {routes.length ? (
            <div className={styles.graphic}>
              <Bar data={data} />
            </div>
          ) : (
            <h1>No data</h1>
          )}
        </TabPanel>
      </TabView>
    </div>
  );
}
