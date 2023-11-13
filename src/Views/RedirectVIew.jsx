import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSailboat } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RedirectView() {
  const [countdown, setCountdown] = useState(3);
  const [link, setLink] = useState('https://placeholder.com');

  const { uniqueId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uniqueId) {
          const response = await axios.get(`https://linksailv2-api.adaptable.app/api/a/${uniqueId}`);
          setLink(response.data.linkUrl);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        await axios.post(`https://linksailv2-api.adaptable.app/api/l/visit/${uniqueId}`)
      }
      catch (error){
        console.log(error)
      }
    };

    fetchData();

    if (uniqueId) {
      const timerId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [uniqueId]);

  useEffect(() => {
    if (countdown <= 0 && link) {
      window.location.href = link;
    }
  }, [countdown, link]);

  return (
    <>
      <div className="flex flex-col">
        <div className="cursor-pointer flex items-center justify-center gap-2 mb-2 p-2">
          <FontAwesomeIcon
            icon={faSailboat}
            size="3x"
            className=""
            style={{ color: "#10B981" }}
          />
          <p className="font-bold tracking-widest text-2xl">LinkSail</p>
        </div>
        <div className="flex items-center justify-center text-white">
          <div className="p-2">
            <div className="bg-neutral-900 rounded-lg shadow-md p-4 text-center">
              <h1 className="text-2xl font-semibold mb-4">
                Redirecting in{" "}
                <span className="text-emerald-500 font-bold">{countdown}</span> seconds...
              </h1>
              <p>
                Please wait while we redirect you to {" "}
                <span className="text-emerald-500 font-bold">
                  {link || "www.placeholder.com"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
