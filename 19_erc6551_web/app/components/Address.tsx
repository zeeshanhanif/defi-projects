import { copyAddress, formatAddress } from "../utils/util-functions";

interface Props {
    //setErrorMessage: Dispatch<SetStateAction<string>>
    accountAddress: string | undefined
    
}

function Address({accountAddress}:Props) {

    return (
        <div className="rounded-full px-3 py-1 bg-slate-400 hover:bg-sky-100 hover:text-black cursor-pointer"
            onClick={()=>{
                copyAddress(accountAddress || "")
            }}>
            { formatAddress(accountAddress)}
        </div>
    );
}

export default Address;