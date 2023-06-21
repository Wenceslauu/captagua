import {
  Chart,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

import dayjs from "dayjs";

import Layout from "@/components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { prisma } from "../../prisma/client.ts";
import { core_leiturasensor } from "@prisma/client";

export default function Home({
  sensors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

  const labels = sensors.map((sensor) =>
    dayjs(sensor.data_hora).format("HH:mm")
  );

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
          data: sensors.map((sensor) => sensor.corrente_bateria),
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
          data: sensors.map((sensor) => sensor.potencia_circuito),
          borderColor: "#10b981",
        },
      ],
    },
    {
      labels,
      datasets: [
        {
          label: "Valor economizado (em energia)",
          data: sensors.map((sensor) => sensor.valor_economizado),
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
                      text: "Umidade (%)",
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
                      text: "Corrente (mA)",
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
                      text: "Potência (kW)",
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
                    text: "Dinheiro (R$)",
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
  sensors: core_leiturasensor[];
}> = async () => {
  let sensors = await prisma.core_leiturasensor.findMany({
    orderBy: {
      id: "asc",
    },
  });

  sensors = sensors.map((sensor) => {
    return {
      ...sensor,
      data_hora: JSON.parse(JSON.stringify(sensor.data_hora)),
    };
  });

  return { props: { sensors } };
};
