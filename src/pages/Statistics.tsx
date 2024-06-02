import {useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import DeafultLayout from "../layout/DeafultLayout";
import endpoint from "../config.json";
import '../scss/pages/statistics.scss'

interface data {
  name: string;
  value: number;
}

function Statistics() {
  const [importData, setImportData] = useState<data[]>([]);
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Gets statistics from fetch
  useEffect(() => {
    const getStatistics = async () => {
      const response = await fetch(`${endpoint.path}admin/statistikData`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accesstoken: accessToken,
        },
      });

      const jsonData = await response.json();

      setImportData([
        { name: "Virksomheder", value: jsonData.Companys },
        { name: "Bruger", value: jsonData.Users },
        { name: "Job opslag", value: jsonData.Jobpostings },
      ]);
      if (!response.ok) {
        throw new Error(jsonData);
      }
    };
    getStatistics();
  }, []);

  return (
    <DeafultLayout>
      <div className="container-sm content center-sta">
        <h1 className="heading-1">Statestik</h1>
        <p>Her vises der data for hvor mange af Bruger, Virksomheder og Job opslag der eksistere i databasen</p>
        <BarChart
          width={500}
          height={300}
          data={importData}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 50, right: 50 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#0b2159" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </DeafultLayout>
  );
}

export default Statistics;
