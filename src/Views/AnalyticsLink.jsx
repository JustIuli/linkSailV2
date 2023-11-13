import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSailboat } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";

import axios from "axios";

function AnalyticsLink(){
    const [visible , setVisibility] = useState(false);
    const [fetchedDetailsSuccess , setFetchedDetailsSuccess] = useState(false);
    const [UniqueId , setUniqueId] = useState('')
    const [LinkUrl , setLinkUrl] = useState('')
    const [LinkVisits , setLinkVisits] = useState('')
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm({
        criteriaMode: "all",
    });

    function goBack(){
        navigate('/')
    }

    const onSubmit = (data) => {
        const api = axios.create({
            baseURL: "https://linksailv2-api.adaptable.app/api/",
        })

        const id = data.link.split('/')[4]

        api.get(`/a/${id}`)
        .then(res => {
            setVisibility(true)
            if(res.data){
                setFetchedDetailsSuccess(true)
                setLinkUrl(res.data.linkUrl)
                setUniqueId( res.data.uniqueId)
                setLinkVisits(res.data.linkVisits)
                return;
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <>
        <div onClick={goBack} className="cursor-pointer flex items-center justify-center gap-2 mb-2 p-2">
            <FontAwesomeIcon icon={faSailboat} size="3x" className="" style={{color: "#10B981",}} />
            <p className="font-bold tracking-widest text-2xl">LinkSail</p>
        </div>
        <div className="flex flex-col gap-2">
            <div className="p-6 rounded-lg bg-neutral-900">
            <h1 className="text-2xl">Link Analytics</h1>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-6 flex flex-col items-center gap-4"
            >
            <input
                type="text"
                placeholder="Ex: https://link-sailv2.vercel.app/r/DdnfKY"
                className="mt-6 text-sm p-3 bg-neutral-700 rounded-lg w-72 m-2"
                {...register("link", {
                required: "This is required.",
                })}
            />
            <button
                type="submit"
                className="bg-emerald-500 
                        inline-block p-2 w-72 text-lg hover:bg-transparent hover:border-emerald-400 
                        hover:text-emerald-400 transitions"
            >
                Submit
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
            </div>
            <div className={classNames("p-4 rounded-lg bg-neutral-900" , {hidden: !visible})}>
                {fetchedDetailsSuccess ? (
                    <>
                        <div className="flex flex-col gap-4">
                        <p className='text-left font-bold'>Link ID:
                            <span className='text-emerald-500'>{UniqueId}</span>
                        </p>
                        <p className='text-left font-bold'>Original Link:
                            <span className='text-emerald-500'>{LinkUrl}</span>
                        </p>
                        <p className='text-left font-bold'>Link Visits:
                            <span className='text-emerald-500'>{LinkVisits}</span>
                        </p>
                        </div>
                    </>
                ) : (
                <>
                    <p className='text-red-500 text-lg tracking-wide'>Invalid shortened link.</p>
                </>
                )}
            </div>
        </div>
        </>
    )
}

export default AnalyticsLink;