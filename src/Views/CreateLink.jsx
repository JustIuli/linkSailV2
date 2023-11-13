import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSailboat } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";

function CreateLink() {

  const urlPattern =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;


  const [link , setLink] = useState('');
  const [visible , setVisibility] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    const api = axios.create({
      baseURL: "https://linksailv2-api.adaptable.app/api/",
    });
  
    api.post("/c", { inputLink: data.link }).then((res) => {
      setLink(`https://link-sailv2.vercel.app/r/${res.data}`)
      setVisibility(true)
    });
  }

  function goBack(){
    navigate('/')
  }

  return (
    <>
    <div className="flex flex-col">
    <div onClick={goBack} className="cursor-pointer flex items-center justify-center gap-2 mb-2 p-2">
        <FontAwesomeIcon icon={faSailboat} size="3x" className="" style={{color: "#10B981",}} />
        <p className="font-bold tracking-widest text-2xl">LinkSail</p>
    </div>
    <div className="flex flex-col gap-2">
        <div className="p-6 rounded-lg bg-neutral-900">
            <h1 className="text-2xl">Create a short link</h1>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-6 flex flex-col items-center gap-2"
            >
            <input
                type="text"
                placeholder="Ex: https://google.com"
                className="mt-6 p-3 bg-neutral-700 rounded-lg w-72 m-2"
                {...register("link", {
                required: "This is required.",
                pattern: {
                    value: urlPattern,
                    message: "Please enter a valid URL.",
                },
                })}
            />
            <button
                type="submit"
                className="bg-emerald-500 
                        inline-block p-2 w-72 text-lg hover:bg-transparent hover:border-emerald-400 
                        hover:text-emerald-400 transitions"
            >
                Shorten
            </button>
            <ErrorMessage
                errors={errors}
                name="link"
                render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                    <p
                    className="text-red-500 font-medium tracking-wide"
                    key={type}
                    >
                    {message}
                    </p>
                ))
                }
            />
            </form>
            <Link
            to={"/analytics"}
            className="text-emerald-500
                    font-medium text-lg hover:underline hover:text-emerald-500"
            >
            View analytics for other links
            </Link>
        </div>
        <div className={classNames("p-4 rounded-lg bg-neutral-900" , {hidden: !visible})}>
            <div className="flex flex-col gap-2">
                <p className="text-2xl">Your link is ready!</p>
                <p className="text-emerald-500">{link}</p>
            </div>
        </div>
    </div>
    </div>
    </>
  );
}

export default CreateLink;
