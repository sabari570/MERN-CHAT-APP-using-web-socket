export const extracttime = (dateString) => {
    const dateObject = new Date(dateString);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedTimeString = formattedHours + ':' + formattedMinutes + ' ' + ampm;

    return formattedTimeString;
};