type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | {[key: string]: JSONValue};

export function mapStrNumberToJSON(data: Map<string, number>): JSONValue {
    const res: JSONValue = {};
    data.forEach((v: number, k: string) => {
        res[k] = v;
    });
    return res;
}

export function mapStrMapToJSON(data: Map<string, Map<string, number>>): JSONValue {
    const res: JSONValue = {};
    data.forEach((v: Map<string, number>, k: string) => {
       res[k] = mapStrNumberToJSON(v);
    });
    return res
}

