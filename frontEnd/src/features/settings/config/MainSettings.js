import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { LuBell, LuSlidersHorizontal, LuUser, LuHouse } from "react-icons/lu";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const SETTINGS = {
  title: "Settings",
  default: "general",
  items: [
    { icon: LuUser, label: "Account", path: "account" },
    { icon: LuSlidersHorizontal, label: "Preferences", path: "preferences" },
    { icon: LuBell, label: "Notifications", path: "notifications" },
    { role: "user", icon: FaRegArrowAltCircleUp, label: "Request Owner", path: "request-owner" },
    { role: "owner", icon: LuHouse, label: "Owner", path: "owner" },
    { role: "admin", icon: MdOutlineAdminPanelSettings, label: "Admin", path: "admin" },
    { icon: FiLock, label: "Privacy", path: "privacy" },  
  ],
};
