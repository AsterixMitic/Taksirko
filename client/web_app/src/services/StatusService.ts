

export function MapStatusToName(status: number): string {
    switch (status) {
        case 1:
            return "Zakazana";
        case 2:
            return "U toku";
        case 3:
            return "Završena";
        case 4:
            return "Otkazana";
        case 5:
            return "Čeka";
        default:
            return "Nepoznat status";
    }
}