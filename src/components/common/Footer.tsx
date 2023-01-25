import React from "react";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <>
      <footer className="px-8 text-sm max-w-2xl mx-auto w-full mb-8">
        <NewsletterForm />
        <div className="mt-8 flex justify-between items-center ">
          <span>{`Lucas Couto • © ${new Date().getFullYear()} • coutox`}</span>
          <p>Feito com ♥</p>
        </div>
      </footer>
    </>
  );
}
