import axios from "axios";
import validateIpAddress from "./utils/validateIpAddress";
import validateDomain from "./utils/validateDomain";

const getLocationData = async (ipOrDomain) => {
  let url;

  if (
    validateIpAddress(ipOrDomain) ||
    ipOrDomain === "" ||
    validateDomain(ipOrDomain)
  ) {
    url = `https://ip-api.com/json/${ipOrDomain}`;
  } else {
    throw new Error("Invalid IP address or domain");
  }

  const response = await axios.get(url);

  return response.data;
};

export default getLocationData;
