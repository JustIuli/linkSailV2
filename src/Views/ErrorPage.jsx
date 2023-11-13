import { useRouteError } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSailboat } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  
  const navigate = useNavigate()
  
  const error = useRouteError();
  console.error(error);

  function goBack(){
    navigate('/')
}

  return (
    <>
        <div className="bg-neutral-900 py-24 px-8 rounded-xl flex flex-col gap-4">
            <div onClick={goBack} className="cursor-pointer flex items-center justify-center gap-2 mb-2 p-2">
                <FontAwesomeIcon icon={faSailboat} size="4x" className="" style={{color: "#10B981",}} />
                <p className="font-bold tracking-widest text-3xl">LinkSail</p>
            </div>
            <div>
                <p className="text-medium mt-4 text-3xl">Sorry, an unexpected error has occurred.</p>
                <p className="mt-4 text-lg text-red-400"><i>{error.statusText || error.message}</i></p>
            </div>
      </div>
    </>
  );
}