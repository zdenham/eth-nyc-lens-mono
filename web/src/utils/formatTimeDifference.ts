const formatTimeDifference = (lastSeenTimestamp: number) => {
    const timeChange = Date.now() - lastSeenTimestamp;
    const seconds = Math.floor(timeChange / 1000) % 60;
    const minutes = Math.floor(timeChange / (1000 * 60)) % 60;
    const hours = Math.floor(timeChange / (1000 * 60 * 60)) % 24;
    const days = Math.floor(timeChange / (1000 * 60 * 60 * 24)) % 365;
    const years = Math.floor(timeChange / (1000 * 60 * 60 * 24 * 365));

    if (!lastSeenTimestamp) {
        return 'a little while';
    }

    if (years > 0) {
        return `${years} ${years > 1 ? 'years' : 'year'}`;
    }
    if (days > 0) {
        return `${days} ${days > 1 ? 'days' : 'day'}`;
    }
    if (hours > 0) {
        return `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
    }
    if (minutes > 0) {
        return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;
    }
    if (seconds > 0) {
        return `${seconds} ${seconds > 1 ? 'seconds' : 'second'}`;
    }

    return 'a second';
};

export default formatTimeDifference;
