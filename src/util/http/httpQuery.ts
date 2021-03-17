let isBrowser = false;

if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    isBrowser = true;
}

function overrideHttpQuery(overrideFn: (url: string) => Promise<string>): void {
    httpQuery = overrideFn;
}

let httpQuery = function httpQuery(url: string): Promise<string> {
    if (isBrowser) {
        return httpQueryBrowser(url);
    } else {
        return httpQueryNode(url);
    }
}

function overrideHttpQueryBrowser(overrideFn: (url: string) => Promise<string>): void {
    httpQueryBrowser = overrideFn;
}

let httpQueryBrowser = (url: string): Promise<string> => {
    throw new Error(`SteamID Utils: Querying Vanity URL (${url}) is not possible by default due to CORS. You should implement your own querying method using \`overrideHttpQueryBrowser()\` method.`);
};

function overrideHttpQueryNode(overrideFn: (url: string) => Promise<string>): void {
    httpQueryNode = overrideFn;
}

let httpQueryNode = (url: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const req = require('https').get(url, (res: any) => {
            let response = '';
            res.on('data', (chunk: any) => { response += chunk; });
            res.on('end', () => { resolve(response); });
        });
        req.on('error', (err: Error) => { reject(err); });
        req.end();
    });
};

export {
    httpQuery,
    overrideHttpQuery,
    overrideHttpQueryBrowser,
    overrideHttpQueryNode,
};
