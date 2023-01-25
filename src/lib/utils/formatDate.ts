import dayjs from 'dayjs'

const formatDate = (date: string, f?: string) => {
  return dayjs(date).format(f ?? 'DD/MM/YYYY')
}

export default formatDate
