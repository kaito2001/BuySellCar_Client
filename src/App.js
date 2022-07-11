import { useContext } from "react";
import { TransferContext } from "./context/TransferContext";
import { AiFillPlayCircle } from "react-icons/ai";

function App() {
  const {currentAccount, connectWallet} = useContext(TransferContext);
  console.log({currentAccount});
  return (
    <div className="App">
      <h1>Hello World</h1>
      {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
    </div>
  );
}

export default App;
