interface props {
  children: string;
  deleteJobtype: () => void;
}

function Jobtype(prop: props) {
  return (
    <div className='jobtype'>
      <p>{prop.children}</p>
      <button onClick={prop.deleteJobtype} aria-label='Slet jobtype' type='button'><img src="src\assets\exitSmall.svg" alt="Slet jobtype ikon"/></button>
    </div>
  )
}

export default Jobtype