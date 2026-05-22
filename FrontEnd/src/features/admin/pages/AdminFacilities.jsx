import { useRef, useState } from "react";
import styles from "./AdminResources.module.css";
import { useAdminFacilities, useAddFacility, useDeleteFacility, useUpdateFacility } from "@/ui/facilities/hooks/useFacilities";
import DataTable from "../../../ui/dataTable/DataTable";
import AdminForm from "../forms/AdminForm";
import Modal from "@/ui/modal/Modal";
import Button from "@/ui/button/Button";
import Spinner from "@/ui/spinner/Spinner";
import { MdAdd } from "react-icons/md";
import Title from "@/ui/title/Title";
import { useCloseComponents } from "@/hooks/useCloseComponents";
import { IMAGE_URL } from "@/services/apiConfig";


export default function AdminFacilities() {
  const facilityRef = useRef(null);
  const [isOpen, setIsOpen] = useCloseComponents(facilityRef);

  
  const { data: facilitiesData, isPending: fetchingFacilities } = useAdminFacilities();
  const { mutate: addFacility, isPending: addingFacility } = useAddFacility();
  const { mutate: deleteFacility } = useDeleteFacility();
  const { mutate: updateFacility, isPending: updatingFacility } = useUpdateFacility();
  const [editItem, setEditItem] = useState(null);

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${IMAGE_URL}/${path}`;
  };

  const columns = [
    { key: "name", label: "Facility Name" },
    { 
      key: "logo", 
      label: "Logo", 
      render: (val) => {
        if (!val) return null;
        const isImage = val.includes("/") || val.includes(".");
        if (isImage) {
          return <img src={getImageUrl(val)} alt="facility" className={styles.thumb} />;
        }
        return <span style={{ fontSize: "1.5rem" }}>{val}</span>;
      }
    },
  ];

  const fields = [
    { name: "name", label: "Facility Name", placeholder: "e.g. Pool" },
    { name: "logo", label: "Emoji Logo", placeholder: "e.g. 🏊" },
  ];

  const handleAdd = (data) => {
    addFacility(data, {
      onSuccess: () => setIsOpen(false)
    });
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsOpen(true);
  };

  const handleUpdate = (data) => {
    updateFacility({ id: editItem._id, ...data }, {
      onSuccess: () => {
        setIsOpen(false);
        setEditItem(null);
      }
    });
  };



  const handleCloseModal = () => {
    setIsOpen(true);
    setEditItem(null);
  };

  if (fetchingFacilities) return <Spinner />;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <header><Title size="xl" mb="0">Manage Facilities</Title></header>
        <Button onClick={handleCloseModal} className={styles.addBtn}>
          <span className={styles.icon}><MdAdd /></span> 
          <span className={styles.text}>Add Facility</span>
        </Button>
      </header>

      <DataTable 
        columns={columns} 
        data={facilitiesData?.data} 
        onDelete={deleteFacility}
        onEdit={handleEdit}
      />

      {isOpen && (
        <Modal ref={facilityRef} setOpen={setIsOpen}>
          <AdminForm 
            title={editItem ? "Edit Facility" : "Add New Facility"}
            fields={fields} 
            defaultValues={editItem ? { name: editItem.name, logo: editItem.logo } : {}}
            onSubmit={editItem ? handleUpdate : handleAdd}
            isLoading={editItem ? updatingFacility : addingFacility}
            isEdit={!!editItem}
          />
        </Modal>
      )}
    </div>
  );
}
