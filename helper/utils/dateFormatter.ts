import moment from "moment";

/**
 * Format date to DD MMM YYYY format
 * @param dateString - Date string to format
 * @returns Formatted date string (e.g., "11 Jan 2026")
 */
export function formatDate(dateString: string): string {
  return moment(dateString).format("DD MMM YYYY");
}

/**
 * Format date to relative time (e.g., "2 days ago")
 * @param dateString - Date string to format
 * @returns Relative time string
 */
export function formatRelativeDate(dateString: string): string {
  return moment(dateString).fromNow();
}

/**
 * Format date to full date format
 * @param dateString - Date string to format
 * @returns Full date string (e.g., "Sunday, January 11, 2026")
 */
export function formatFullDate(dateString: string): string {
  return moment(dateString).format("dddd, MMMM D, YYYY");
}

/**
 * Compare two dates for sorting
 * @param dateA - First date string
 * @param dateB - Second date string
 * @param order - Sort order ("newest" or "oldest")
 * @returns Sort comparison number
 */
export function compareDates(
  dateA: string,
  dateB: string,
  order: "newest" | "oldest" = "newest"
): number {
  const momentA = moment(dateA);
  const momentB = moment(dateB);

  if (order === "newest") {
    return momentB.valueOf() - momentA.valueOf();
  }
  return momentA.valueOf() - momentB.valueOf();
}
