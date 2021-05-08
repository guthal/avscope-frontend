export const transformGetContents = data =>
    data.map(content => ({
        id: content.id,
        description: content.description,
        name: content.name,
        posterUrl: content.posterUrl,
    }));

export const transformGetContent = data => ({
    id: data.id,
    description: data.description,
    name: data.name,
    posterUrl: data.posterUrl,
});

export const transformGetHistoryData = data => {
    return data.map(history => {
        const isTicketValid = new Date() <= history.endDate;
        return {
            purchaseDate: history.startDate,
            ticketId: history.ticketId,
            name: history.name,
            posterUrl: history.posterUrl,
            isTicketValid: isTicketValid,
        };
    });
};
