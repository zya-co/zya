export default function DarkElement({
  children, 
  ignore,
  style,
}: {
  children: any,
  ignore?: boolean
  style?: React.CSSProperties
}) {

  return (
    <div className={`${ignore ? 'lightElement' : 'darkElement'}`} style={style}>
      {children}
    </div>
  )
}