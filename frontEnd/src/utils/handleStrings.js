const isNotString = function (string) {
    return (string == "" || typeof (string) !== "string")
}

export const toCamelCase = function (string = "") {
    if (isNotString(string)) return
    const strings = string.trim().split(' ')
    const camelCase = strings.slice(1).reduce((acc, cur, i) => {
        return acc + cur[0].toUpperCase() + cur.slice(1)
    }, strings[0].toLowerCase());

    return camelCase
}

export const capitalizeFirstLetter = function (string = "") {
    if (isNotString(string)) return
    const strings = string.trim().split(' ')
    const capitalize = strings.reduce((acc, cur, i) => {
        return acc + cur[0].toUpperCase() + cur.slice(1) + " "
    }, "");
    return capitalize
}

export const firstLettersFullName = function (string = "") {
    if (isNotString(string)) return
    const strings = string.trim().split(' ')
    return `${strings[0][0].toUpperCase()}${strings[1][0].toUpperCase()}`
}