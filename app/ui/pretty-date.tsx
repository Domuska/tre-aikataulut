function isValidDate(d: any) {
  return d instanceof Date;
}

export const PrettyDate = ({ date }: { date: string }) => {
  const asDate = new Date(date);

  if (!isValidDate(asDate)) {
    console.log("Date is not valid", date);
    return <>Unknown arrival time</>;
  }
  return <>{asDate.toLocaleTimeString()}</>;
};
