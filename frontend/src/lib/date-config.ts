export const getYearsOptions = (yearsBack: number) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: yearsBack }, (_, index) => {
        const year = currentYear - index;
        return {
            id: year,
            value: year,
            label: year.toString(),
        };
    });
}