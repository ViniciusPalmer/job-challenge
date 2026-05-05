import { useNavigate } from "react-router-dom";

import googleAppsIcon from "../../../../assets/google_apps_icon.svg";
import userAvatar from "../../../../assets/user_avatar.svg";
import googleIcon from "../../../../assets/google_icon.png";
import { SearchMenuBar } from "../../../../components/SearchMenuBar";

export function ResultHeader() {
  const navigate = useNavigate();
  function returnToMain(e: any) {
    e.preventDefault();
    navigate("/");
  }
  return (
    <header className="flex w-full items-center justify-between p-6 border-b border-gray-150">
      <div className="flex items-center">
        <img className="h-12 cursor-pointer md:scale-150 md:w-auto md:h-auto" src={googleIcon} alt="Go to home" onClick={returnToMain} />
        <SearchMenuBar />
      </div>
      <div className="hidden sm:flex flex-row p-2 w-[150px] h-[60px]">
        <img className="max-w-[44px]" src={googleAppsIcon} alt="" />
        <img className="max-w-[44px] ml-4" src={userAvatar} alt="" />
      </div>
    </header>
  );
}