const thousandcomma = (props: string) => {
  return props.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default thousandcomma;
