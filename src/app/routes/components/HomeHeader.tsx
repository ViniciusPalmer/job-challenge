import googleAppsIcon from "../../../assets/google_apps_icon.svg";
import userAvatar from "../../../assets/user_avatar.svg";

export function HomeHeader() {
  return (
    <header className="flex w-full items-center justify-between p-6 border-b border-gray-150">
      <h1 className="text-xl font-light md:text-base">
        <b>Agile Content</b> Frontend Test
      </h1>
      <div className="flex flex-row p-2 w-[110px] h-[60px]">
        <img className="w-6 h-6" src={googleAppsIcon} alt="Google Apps" />
        <img className="w-6 h-6 ml-4" src={userAvatar} alt="Female Avatar" />
      </div>
    </header>
  );
}
