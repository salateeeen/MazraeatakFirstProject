import styles from "./AdminResources.module.css";
import { useAdminUsers } from "../hooks/useAdminUsers";
import DataTable from "../../../ui/dataTable/DataTable";
import Spinner from "@/ui/spinner/Spinner";
import Title from "@/ui/title/Title";

export default function AdminUsers() {
  const { data: usersData, isPending: fetchingUsers, error } = useAdminUsers();

  if (fetchingUsers) return <Spinner />;
  if (error) return <div className={styles.error}>{error.message}</div>;

  const users = usersData?.data || [];

  const columns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { 
      key: "role", 
      label: "Role",
      render: (role) => <span style={{ textTransform: "capitalize" }}>{role}</span>
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <header><Title size="xl" mb="0">All Users</Title></header>
      </header>

      <DataTable 
        columns={columns} 
        data={users} 
      />
    </div>
  );
}
