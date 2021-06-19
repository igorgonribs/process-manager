export const statusList = [
    {
        id: 1,
        color: "#54f9ff",
        label: "Criado"
    },
    {
        id: 2,
        color: "#0007d1",
        label: "Executando Processo"
    },
    {
        id: 3,
        color: "#e7eb00",
        label: "Aguardando Parecer"
    },
    {
        id: 4,
        color: "#1b9c02",
        label: "Sucesso"
    },
    {
        id: 5,
        color: "#ffa200",
        label: "Insucesso"
    },
    {
        id: 6,
        color: "#bf2821",
        label: "Cancelado"
    }
];

export const resolveStatusColorByStatusId = (status) => {
    return statusList.find(x => x.label.toUpperCase() == status.toUpperCase()).color;
}

export const resolveStatusIdByStatusName = (statusName) => {
    return statusList.find(x => x.label.toUpperCase() == statusName.toUpperCase()).id;
}

export const resolveStatusNameByStatusId = (statusId) => {
    return statusList.find(x => x.id == statusId).label;
}