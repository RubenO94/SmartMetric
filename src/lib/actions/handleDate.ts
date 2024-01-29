export function transformDate(inputDate: string, lang?: string) {
    const date = new Date(inputDate)
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    return date.toLocaleString(lang, options)
}