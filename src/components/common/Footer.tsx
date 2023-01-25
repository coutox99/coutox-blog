import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center text-sm max-w-2xl mx-auto w-full mb-8">
      <span>{`Lucas Couto • © ${new Date().getFullYear()} • coutox`}</span>
      <p>Feito com ♥</p>
    </footer>
  );
}
