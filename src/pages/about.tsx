import Image from "next/image";

import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-6 lg:w-1/2">
          <h1 className="text-5xl">Sobre o projeto...</h1>
          <p className="text-justify">
            &emsp; O uso irresponsável dos recursos naturais é um dos maiores problemas
            da sociedade. Nesse contexto, observa-se, em especial no setor
            agrícola, o descaso em relação ao uso excessivo da água e ao grande
            consumo energético oriundo de fontes não renováveis. Visando
            remediar esses problemas, o projeto propõe a melhora do planejamento
            do uso dos recursos hídricos e da matriz energética de pequenos e
            médios agricultores, por meio da captação de águas pluviais e seu
            uso em sistemas de irrigação movidos a energia solar.
          </p>
          <div className="flex flex-col lg:flex-row gap-4">
              <Image src='/images/farm-mockup.png' alt='A farm mockup' height={360} width={360} style={{ 
                objectFit: 'cover',
              }} />
              <Image src='/images/solar-panel.png' alt='A solar panel' height={360} width={360} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
