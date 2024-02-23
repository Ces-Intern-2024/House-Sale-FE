export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Thêm số 0 đằng trước nếu số tháng là một chữ số
  const day = String(date.getDate()).padStart(2, '0') // Thêm số 0 đằng trước nếu số ngày là một chữ số
  const hours = String(date.getHours()).padStart(2, '0') // Thêm số 0 đằng trước nếu số giờ là một chữ số
  const minutes = String(date.getMinutes()).padStart(2, '0') // Thêm số 0 đằng trước nếu số phút là một chữ số
  const seconds = String(date.getSeconds()).padStart(2, '0') // Thêm số 0 đằng trước nếu số giây là một chữ số

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDate
}

export const formatMoney = (numberString: string) => {
  const formattedNumber = parseInt(numberString)
  return formattedNumber
}
