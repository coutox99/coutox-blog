import React, { useRef, useState } from "react";
import siteMetadata from "../../data/siteMetadata";

const NewsletterForm = ({
  title = "📰 Um Boletim completo sobre Arquitetura de Software",
}) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error: resError } = await res.json();
    if (resError) {
      setLoading(false);
      setError(true);
      setMessage(
        "Your e-mail address is invalid or you are already subscribed!"
      );
      return;
    }

    inputEl.current.value = "";
    setLoading(false);
    setError(false);
    setSubscribed(true);
    setMessage("Quase pronto!! 🎉 Enviamos um email pra você.");
  };

  return (
    <div className="bg-indigo-500 rounded-md p-4">
      <div className="pb-1 font-extrabold text-2xl md:text-4xl text-white">
        {title}
      </div>
      <p className="text-white py-4 text-lg">
        Receba toda semana as atualizações, novos artigos e muito mais.
      </p>
      <form className="flex flex-col sm:flex-row" onSubmit={subscribe}>
        <div className="flex md:w-2/3">
          <label className="sr-only" htmlFor="email-input">
            Email
          </label>
          <input
            autoComplete="email"
            className="w-full rounded-md px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
            id="email-input"
            name="email"
            placeholder={
              subscribed ? "Você está inscrito!  🎉" : "Insira seu email"
            }
            ref={inputEl}
            required
            type="email"
            disabled={subscribed}
          />
        </div>
        <div className="mt-2 flex flex-1 rounded-md shadow-sm sm:mt-0 sm:ml-3">
          <button
            className={`w-full bg-pink-500 rounded-md bg-primary-500 py-2 px-4 font-medium text-white sm:py-0 ${
              subscribed
                ? "cursor-default"
                : "hover:bg-primary-700 dark:hover:bg-primary-400"
            } focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black`}
            type="submit"
            disabled={loading || subscribed}
          >
            {loading ? (
              "Aguarde..."
            ) : (
              <span>{subscribed ? "Obrigado!" : "Inscreva-se"}</span>
            )}
          </button>
        </div>
      </form>
      {subscribed && (
        <div className="text-white mt-2 text-xs">
          Precisamos que você confirme a inscrição em seu email. Confira a caixa
          de span.
        </div>
      )}
      {error && (
        <div className="w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96">
          {message}
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;

export const BlogNewsletterForm = ({ title }) => (
  <div className="flex items-center justify-center">
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterForm title={title} />
    </div>
  </div>
);
