export const formatDate = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatShortDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

export const getDoctorName = (
  doctorRef: string | { _id: string; name: string; specialization?: string },
): string => {
  if (typeof doctorRef === "string") return "Assigned Doctor";
  return doctorRef?.name ?? "Unknown Doctor";
};
