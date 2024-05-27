const STYLE = ['btn-primary', 'btn-danger', 'btn-secondary'];
const SIZE = ['btn-lg', 'btn-med', 'btn-sm'];
const Button = (props) => {
  const checkButtonStyle = STYLE.includes(props.buttonStyle) ? props.buttonStyle : STYLE[0]
  const checkButtonSize = SIZE.includes(props.buttonSize) ? props.buttonSize : SIZE[0]
  return (
    <button style={{fontWeight: '700'}}
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default Button;