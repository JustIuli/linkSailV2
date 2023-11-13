import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSailboat } from '@fortawesome/free-solid-svg-icons'

function App() {
  const navigate = useNavigate()


  function getStarted(){
      navigate('/create-link');
  }

  return (
    <>
        <div className="flex items-center justify-center gap-2 p-2">
        <FontAwesomeIcon icon={faSailboat} size="4x" className="" style={{color: "#10B981",}} />
        <h1 className='font-bold tracking-widest'>LinkSail</h1>
        </div>
        <p className='m-2 text-lg font-medium'>Shorten link for free! Forever!</p>
        <button onClick={getStarted} className='mt-2 bg-emerald-500 
        hover:bg-transparent hover:border-emerald-500
        hover:text-emerald-500 hover:scale-110 transition'>
          Get Started
          </button>
    </>
  )
}

export default App
