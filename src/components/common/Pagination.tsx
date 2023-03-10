import Link from "./Link"

interface Props {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: Props) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
      <nav className='flex space-x-2 justify-between'>
        {!prevPage && (
          <button
            className='cursor-auto disabled:opacity-50'
            disabled={!prevPage}
          >
            Voltar
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`
            }
          >
            <span>Voltar</span>
          </Link>
        )}
        <span>
          {currentPage} de {totalPages}
        </span>
        {!nextPage && (
          <button
            className='cursor-auto disabled:opacity-50'
            disabled={!nextPage}
          >
            Próximo
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <span>Próximo</span>
          </Link>
        )}
      </nav>
    </div>
  )
}
