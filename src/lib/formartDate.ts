export default function formatISODateToLongDate(isoDate: string): string {
	const date = new Date(isoDate);
	console.log(isoDate);

	const monthNames = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	const day = date.getDate();
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	return `${day} ${month} ${year}`;
}
