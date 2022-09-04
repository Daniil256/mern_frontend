export const writeDate = (date) => {
    const dateAt = new Date(Date.parse(date))
    const writeTime = (time) => {
        if (time < 10) {
            return `0${time}`
        }
        return time
    }
    const writeMonth = () => {
        switch (dateAt.getMonth()) {
            case 0:
                return 'января'
            case 1:
                return 'февраля'
            case 2:
                return 'марта'
            case 3:
                return 'апреля'
            case 4:
                return 'мая'
            case 5:
                return 'июня'
            case 6:
                return 'июля'
            case 7:
                return 'августа'
            case 8:
                return 'сентября'
            case 9:
                return 'октября'
            case 10:
                return 'ноября'
            case 11:
                return 'декабря'
            default:
                return 'дата не определена'
        }
    }
    return `${dateAt.getDate()} ${writeMonth()} ${dateAt.getFullYear()} ${writeTime(dateAt.getHours())}:${writeTime(dateAt.getMinutes())}`
}