const validateDomain = (domain) => {
  const domainPattern =
    /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)(?:\.[a-zA-Z]{2,})+$/;

  return domainPattern.test(domain);
};

export default validateDomain;
