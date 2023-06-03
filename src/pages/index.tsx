import {
  Chart,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

import Layout from "@/components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { prisma } from "../../prisma/client.ts";
import { umidade_solo } from "@prisma/client";

export default function Home({
  sensors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

  // const labels = sensors.map((sensor) => sensor.id);
  const labels = ["09:00", "12:00", "15:00"];

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: true,
      },
    },
  };

  const data = [
    {
      labels,
      datasets: [
        {
          label: "Umidade",
          data: sensors.map((sensor) => sensor.umidade_solo),
          borderColor: "#0891b2",
        },
      ],
    },
    {
      labels,
      datasets: [
        {
          label: "Fluxo",
          data: sensors.map((sensor) => sensor.fluxo_agua),
          borderColor: "#0891b2",
        },
      ],
    },
    {
      labels,
      datasets: [
        {
          label: "Corrente",
          data: [20, 30, 30],
          borderColor: "#10b981",
        },
      ],
    },
    {
      labels,
      datasets: [
        {
          label: "Tensão",
          data: sensors.map((sensor) => 5),
          borderColor: "#10b981",
        },
      ],
    },
    {
      labels,
      datasets: [
        {
          label: "Potência",
          data: [20, 30, 30].map((corrente) => 5 * corrente),
          borderColor: "#10b981",
        },
      ],
    },
    {
      labels,
      datasets: [
        {
          label: "Valor economizado (em energia)",
          data: [150, 180, 185],
          borderColor: "#eab308",
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-row flex-wrap justify-between items-center gap-8">
          <div className="flex-1 flex flex-col justify-center items-center">
            <span className="ml-8">Umidade</span>
            <Line
              options={{
                responsive: true,
                scales: {
                  x: {
                    display: true,
                    title: {
                      display: true,
                      text: "Tempo (h)",
                    },
                  },
                  y: {
                    display: true,
                    title: {
                      display: true,
                      text: "Umidade (g/m³)",
                    },
                    beginAtZero: true,
                  },
                },
              }}
              data={data[0]}
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <span className="ml-8">Fluxo</span>
            <Line
              options={{
                responsive: true,
                scales: {
                  x: {
                    display: true,
                    title: {
                      display: true,
                      text: "Tempo (h)",
                    },
                  },
                  y: {
                    display: true,
                    title: {
                      display: true,
                      text: "Fluxo (m³/s)",
                    },
                    beginAtZero: true,
                  },
                },
              }}
              data={data[1]}
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-between items-center gap-8">
          <div className="flex-1 flex flex-col justify-center items-center">
            <span className="ml-8">Corrente</span>
            <Line
              options={{
                responsive: true,
                scales: {
                  x: {
                    display: true,
                    title: {
                      display: true,
                      text: "Tempo (h)",
                    },
                  },
                  y: {
                    display: true,
                    title: {
                      display: true,
                      text: "Corrente (A)",
                    },
                    beginAtZero: true,
                  },
                },
              }}
              data={data[2]}
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <span className="ml-8">Tensão</span>
            <Line
              options={{
                responsive: true,
                scales: {
                  x: {
                    display: true,
                    title: {
                      display: true,
                      text: "Tempo (h)",
                    },
                  },
                  y: {
                    display: true,
                    title: {
                      display: true,
                      text: "Tensão (V)",
                    },
                    beginAtZero: true,
                  },
                },
              }}
              data={data[3]}
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <span className="ml-8">Potência</span>
            <Line
              options={{
                responsive: true,
                scales: {
                  x: {
                    display: true,
                    title: {
                      display: true,
                      text: "Tempo (h)",
                    },
                  },
                  y: {
                    display: true,
                    title: {
                      display: true,
                      text: "Potência (W)",
                    },
                    beginAtZero: true,
                  },
                },
              }}
              data={data[4]}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="ml-8">Economia de energia</span>
          <Line
            options={{
              responsive: true,
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Tempo (h)",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "Energia (kWh)",
                  },
                  beginAtZero: true,
                },
              },
            }}
            data={data[5]}
          />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  sensors: umidade_solo[];
}> = async () => {
  const sensors = await prisma.umidade_solo.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return { props: { sensors } };
};
