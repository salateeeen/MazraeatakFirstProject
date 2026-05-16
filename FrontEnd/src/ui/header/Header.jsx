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

export default function Header() {
  
  const [isScrolled] = useIsScrolledY();
  const navigate = useNavigate();
  const location = useLocation();

  const searchForm = useForm({
    defaultValues: { search: "" },
  });
  const search = searchForm.watch("search");

  const { data: farmsName = [], isPending } = useFarmsName(search, { 
    enabled: search?.trim().length >= 2 
  });

  const isHome = location.pathname.includes("home");
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  function handleSubmit(data) {
    if (data.search.length <= 2) return;

    const params = new URLSearchParams();
    params.set("farmName[regex]", data.search.toLowerCase());

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
    <header className={`${styles.header} ${!isHome ? styles.isNotHome : ""}`}>
      <div onClick={handleLogo} className={styles.logo}>
        <MdOutlineVilla className={styles.icon} />
      </div>
      <h1>Mazraeatak</h1>
      <FormProvider {...searchForm}>
        <form onSubmit={searchForm.handleSubmit(handleSubmit)}>
          <div
          
            className={`${styles.search} ${isHome ? styles.isHome : ""} ${isScrolled ? styles.isScroll : ""}`}
          >
            <Search
              onSubmit={searchForm.handleSubmit(handleSubmit)}
              onSelect={handleSelectFarm}
              results={farmsName.data}
              search={search}
              isPending={isPending}
              placeholder={`Enter farm name…`}
              RenderItem={ResultFarmsName}
            />
          </div>
        </form>
      </FormProvider>
      <div>
        {isLoggedIn && 
        <div className={styles.accountAndNotifications}>
          <NotificationBell />
          <Account />
        </div>
        }
        {!isLoggedIn && (
          <div className={styles.register}>
            <Button onClick={handleSignup}>Sign Up</Button>
            <Button onClick={handleLogin}>Log In</Button>
          </div>
        )}
      </div>
    </header>
  );
}

