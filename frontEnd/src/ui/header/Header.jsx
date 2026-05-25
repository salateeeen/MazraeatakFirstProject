import styles from "./Header.module.css";
import Button from "../button/Button";
import Search from "../forms/search/Search";
import Account from "../account/Account";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { MdOutlineVilla, MdOutlineNotificationsNone } from "react-icons/md";
import { useFarmsName } from "@/features/farms/hooks/useFarmsName";
import { useIsScrolledY } from "@/hooks/useIsScrolledY";
import ResultFarmsName from "@/features/farms/components/ResultFarmsName";

import NotificationBell from "@/features/notifications/components/NotificationBell";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/user/userSlice";

export default function Header() {
  
  const [isScrolled] = useIsScrolledY();
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchForm = useForm({
    defaultValues: { farmName: "" },
  });

  const farmName = searchForm.watch("farmName");

  const { data: farmsName, isPending } = useFarmsName(farmName);
  
  const isHome = location.pathname.includes("home");
  const isAuthenticated = useSelector(selectIsAuthenticated)
  

  function handleSubmit(data) {
    const params = new URLSearchParams();
    params.set("farmName[regex]", data.farmName.toLowerCase());

    navigate(`/app/farms?${params.toString()}`);
    searchForm.reset();
  }

  function handleSelectFarm(id) {
    searchForm.reset();
    navigate(`/app/farm/${id}`);
  }

  function handleLogo() {
    navigate("/app/home");
  }

  function handleLogin() {
    navigate("/login");
  }

  function handleSignup() {
    navigate("/signup");
  }

  return (
    <div className={`${styles.header} ${!isHome ? styles.isNotHome : ""}`}>
      <div onClick={handleLogo} className={styles.logo}>
        <MdOutlineVilla className={styles.icon} />
      </div>
      <h1>Mazraeatak</h1>

      <FormProvider {...searchForm}>
        <form>
          <div
            className={`${styles.search} ${isHome ? styles.isHome : ""} ${isScrolled ? styles.isScroll : ""}`}
          >
            <Search
              onSubmit={searchForm.handleSubmit(handleSubmit)}
              onSelect={handleSelectFarm}
              results={farmsName?.data}
              searchName={"farmName"}
              searchValue={farmName}
              isPending={isPending}
              placeholder={`Enter farm name…`}
              RenderItem={ResultFarmsName}
            />
          </div>
        </form>
      </FormProvider>

      <div>
        {isAuthenticated && 
        <div className={styles.accountAndNotifications}>
          <NotificationBell />
          <Account />
        </div>
        }
      
        {!isAuthenticated && (
          <div className={styles.register}>
            <Button onClick={handleSignup}>Sign Up</Button>
            <Button onClick={handleLogin}>Log In</Button>
          </div>
        )}
      </div>
    </div>
  );
}

