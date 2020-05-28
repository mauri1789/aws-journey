const domain = 'mauridev.net';

let journey_url = (sub_domain:string, path:string) => {
    return `https://${sub_domain}.${domain}/${path}`;
}

export {journey_url}
