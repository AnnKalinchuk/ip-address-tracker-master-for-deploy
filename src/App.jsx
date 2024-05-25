import { useEffect, useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent/MapComponent";
import { useForm } from "react-hook-form";
import iconArrow from "./assets/images/icon-arrow.svg";
import getLocationData from "./service";
import timezoneFormat from "./utils/timezoneFormat";
import defaultData from "./utils/DefaultData";

function App() {
  const [data, setData] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [ipOrDomain, setIpOrDomain] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getData = async (ipOrDomain) => {
    try {
      setErrorResponse("");

      let ipOrDomainToUse = ipOrDomain;
      if (ipOrDomainToUse === "") {
        ipOrDomainToUse = "192.212.174.101";
      }

      const responseData = await getLocationData(ipOrDomainToUse);
      console.log(responseData);
      setData(responseData);
      setCoordinates({
        lat: responseData.latitude,
        lng: responseData.longitude,
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
      if (error.message.includes("Network Error")) {
        setData(defaultData);
        setCoordinates({
          lat: defaultData.latitude,
          lng: defaultData.longitude,
        });
      } else {
        setErrorResponse(error.message);
      }
    }
  };

  useEffect(() => {
    getData(ipOrDomain);
  }, [ipOrDomain]);

  const onSubmit = (data) => {
    setIpOrDomain(data.ipOrDomain);
  };

  return (
    <div className="app-wrapper">
      <div className="search-wrapper">
        <div className="search-inner">
          <div className="search-block">
            <h1>IP Address Tracker</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="search-input-container">
                <input
                  {...register("ipOrDomain", { required: true })}
                  placeholder="Search for any IP address or domain"
                  className="input-ipAddress"
                />
                <button type="submit">
                  <img src={iconArrow} alt="arrow-right" />
                </button>
              </div>
              {/* {errors.ipOrDomain && <span>{errorResponse}</span>} */}
              {errorResponse && <span>{errorResponse}</span>}
            </form>
          </div>
          {data && (
            <div className="center-block">
              <div className="center-block-container">
                <div className="info-group">
                  <h4 className="info-header">IP Address</h4>
                  <div className="info">{data.ip}</div>
                </div>
                <div className="info-group">
                  <h4 className="info-header">Location</h4>
                  <div className="info">
                    {`${data.city}, ${data.state_prov} ${data.zipcode}`}
                  </div>
                </div>
                <div className="info-group">
                  <h4 className="info-header">Timezone</h4>
                  <div className="info">
                    UTC
                    {timezoneFormat(data.time_zone.name)}
                  </div>
                </div>
                <div className="info-group info-last-element">
                  <h4 className="info-header">ISP</h4>
                  <div className="info">{data.isp ? data.isp : "-"}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="leaflet-wrapper">
        {coordinates && <MapComponent coordinates={coordinates} />}
      </div>
    </div>
  );
}

export default App;
