import { InputProps } from '../../dtos/requests/ComponentRequest'

function Input({ onChange, name, placeholder, value = "" }: InputProps) {
  return (
    <input
      onChange={event => onChange(event.target.value)}
      name={name}
      placeholder={placeholder}
      value={value}
    />
  );
}

export default Input;