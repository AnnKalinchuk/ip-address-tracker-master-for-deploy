const validateIpAddress = (ip) => {
  const ipFormat = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

  return ipFormat.test(ip);
};

export default validateIpAddress;
