import { HistoryTransaction } from '@/types/historyTransaction'

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') 
  const day = String(date.getDate()).padStart(2, '0') 
  const hours = String(date.getHours()).padStart(2, '0') 
  const minutes = String(date.getMinutes()).padStart(2, '0') 
  const seconds = String(date.getSeconds()).padStart(2, '0') 

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDate
}

export const formatDateNoHours = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Thêm số 0 đằng trước nếu số tháng là một chữ số
  const day = String(date.getDate()).padStart(2, '0') // Thêm số 0 đằng trước nếu số ngày là một chữ số
  

  const formattedDate = `${year}-${month}-${day} `
  return formattedDate
}

export const formatMoneyToUSD = (numberString: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  const formattedNumber = formatter.format(numberString)
  return formattedNumber
}

export function sortTransactionsByDate(
  transactions: HistoryTransaction[],
): HistoryTransaction[] {
  // Sort transactions by date ascending.
  return transactions.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return dateB - dateA
  })
}

export function formatDateToYYYYMMDD(date: Date | null) {
    if(date){
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');

  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
}
export function convertISOToVNDateTimeString(isoDate:any) {
  const date = new Date(isoDate);
  const vietnamTime = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
  const year = vietnamTime.getFullYear();
  const month = String(vietnamTime.getMonth() + 1).padStart(2, '0');
  const day = String(vietnamTime.getDate()).padStart(2, '0');
  const hours = String(vietnamTime.getHours()).padStart(2, '0');
  const minutes = String(vietnamTime.getMinutes()).padStart(2, '0');
  const seconds = String(vietnamTime.getSeconds()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export function getSevenDaysBeforeToday() {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return lastWeek;
}

