export const capitalize = (str = '') => {
    return str.length
        ? str.charAt(0).toUpperCase() + str.slice(1)
        : '';
};