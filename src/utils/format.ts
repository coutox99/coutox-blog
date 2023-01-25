import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

export function formatDate(date: string, f?: string) {
  return dayjs(date).locale('pt-br').format(f ?? 'DD MMMM YYYY')
}