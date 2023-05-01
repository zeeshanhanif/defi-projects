"use client"

import { ConnectButton, useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css';


export default function ConnectBtn() {

    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    return (
        <div className="ml-5 w-full">
            <ConnectButton   />

            {/*

            {openConnectModal && (
        <button onClick={openConnectModal} type="button">
          Open Connect Modal
        </button>
      )}

      {openAccountModal && (
        <button onClick={openAccountModal} type="button">
          Open Account Modal
        </button>
      )}

      {openChainModal && (
        <button onClick={openChainModal} type="button">
          Open Chain Modal
        </button>
      )}
       */}
        </div>
    );
}