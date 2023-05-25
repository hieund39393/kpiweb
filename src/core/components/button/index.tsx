import { ButtonProps } from '../../dtos/requests/ComponentRequest'

function Button({ value, processing }: ButtonProps) {
  return <button>{processing ? "Đang xử lý" : value}</button>;
}

export default Button