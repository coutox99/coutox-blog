import React from "react";
import Image from "next/image";
export default function Hero() {
  return (
    <div>
      <div className="flex w-full justify-between flex-col-reverse sm:flex-row items-start">
        <div className="flex flex-col pr-8">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
            Lucas Couto
          </h1>
          <h2 className="text-gray-700 dark:text-gray-200 mb-4">
            Arquiteto e Desenvolvedor de Software{" "}
            {/* <span className="font-semibold">Vercel</span> */}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-16">
            Escrevo sobre arquitetura, estratégia, entrega contínua e DDD.
          </p>
        </div>
        <div className="">
          <Image
            alt="Lucas Couto"
            height={110}
            width={110}
            src="/static/images/lucas.png"
            sizes="30vw"
            priority
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
