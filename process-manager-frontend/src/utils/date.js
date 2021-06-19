export const convertJavascriptDateToBackendDate = (date) => {
    const day = date.split("T")[0].split("-")[2];
    const month = date.split("T")[0].split("-")[1];
    const year = date.split("T")[0].split("-")[0];
    const hours = date.split("T")[1].split(":")[0];
    const mins = date.split("T")[1].split(":")[1];
    return `${day}/${month}/${year} ${hours}:${mins}`;
}

export const convertBackenddateToJavascriptDate = (date) => {
    const day = date.split(" ")[0].split("/")[0];
    const month = date.split(" ")[0].split("/")[1];
    const year = date.split(" ")[0].split("/")[2];
    const hours = date.split(" ")[1].split(":")[0];
    const mins = date.split(" ")[1].split(":")[1];
    return `${year}-${month}-${day}T${hours}:${mins}`;
}