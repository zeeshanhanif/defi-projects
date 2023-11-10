import { toast } from "react-toastify";

export const convertImageURLFromIpfsToHttp = (ipfsUrl: string | undefined):string => {
    return ipfsUrl && ipfsUrl.trim()? ipfsUrl.replace("ipfs://", "https://ipfs.io/ipfs/"): "";
}

export const formatAddress = (address: string | undefined) => {
    return address? address.slice(0, 4) + "..." + address.slice(-4):address;
};

export const copyAddress = (address: string) => {
    var copyText = address;
    navigator.clipboard.writeText(copyText);
    toast.info("Address Copied ", {
        position: toast.POSITION.TOP_CENTER,
        autoClose:500,
        hideProgressBar: true
    });
};

export const compareAddresses = (address1: string, address2: string):boolean => {
    return address1.toLocaleLowerCase() == address2.toLocaleLowerCase();  
};