export type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | {[key: string]: JSONValue};

export function mapStrNumberToJSON(data: Map<string, Array<number>>): JSONValue {
    const res: JSONValue = {};
    data.forEach((v: Array<number>, k: string) => {
        res[k] = v;
    });
    return res;
}

