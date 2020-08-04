export type ResponseType<T extends object> = {
    data: T;
    status: number;
    ok: true;
} | {
    error: string;
    status: number;
    ok: false;
}

const DEFAULT_ERROR = {error: 'Unexpected error', ok: false, status: 500};

export const request = async <T extends object,>(
    url: RequestInfo,
    options?: RequestInit,
): Promise<ResponseType<T>> => {
    let body: {data: T} | {error: string};
    let ok: boolean, status: number;

    try {
        const res = await fetch(url, options);

        ok = res.ok;
        status = res.status;

        body = await res.json();
    } catch(e) {
        // eslint-disable-next-line no-console
        console.log(e);

        return DEFAULT_ERROR as ResponseType<T>;
    }

    if (ok === false) {
        const {error} = body as {error: string};

        return {
            error: error || DEFAULT_ERROR.error,
            ok,
            status,
        };
    }

    return {
        data: (body as {data: T}).data,
        ok,
        status,
    };
};
