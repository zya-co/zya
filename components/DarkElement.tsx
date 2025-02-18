export default function DarkElement({
  children, 
  ignore
}: {
  children: any,
  ignore?: boolean
}) {

  return (
    <div className={`${ignore ? 'lightElement' : 'darkElement'}`}>
      {children}
    </div>
  )
}