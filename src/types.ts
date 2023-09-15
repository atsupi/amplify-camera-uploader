
export type MeasDataParams = {
    id: string;
    type: string;
    key: string;
    date: number;
    param1: string;
    param2: string;
    param3: string;
}

export type ListItemParams = {
    item: MeasDataParams;
    metadata: { colorRef: string };
};

