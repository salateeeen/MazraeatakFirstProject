import { useRef, useState } from "react";
import styles from "./AdminResources.module.css";
import { useAdminCities, useAddCity, useDeleteCity, useUpdateCity } from "@/ui/cities/hooks/useCities";
import DataTable from "../../../ui/dataTable/DataTable";
import AdminForm from "../forms/AdminForm";
import Modal from "@/ui/modal/Modal";
import Button from "@/ui/button/Button";
import Spinner from "@/ui/spinner/Spinner";
import { MdAdd } from "react-icons/md";
import Title from "@/ui/title/Title";
import { useCloseComponents } from "@/hooks/useCloseComponents";
import { IMAGE_URL } from "@/services/apiConfig";


export default function AdminCities() {
  const { data: citiesData, isPending: fetchingCities } = useAdminCities();
  const { mutate: addCity, isPending: addingCity } = useAddCity();
  const { mutate: deleteCity } = useDeleteCity();
  const { mutate: updateCity, isPending: updatingCity } = useUpdateCity();
  const cityRef = useRef(null);
  const [isOpen, setIsOpen] = useCloseComponents(cityRef);
  const [editItem, setEditItem] = useState(null);

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${IMAGE_URL}/${path}`;
  };

  const columns = [
    { key: "name", label: "City Name" },
    { 
      key: "image", 
      label: "Image", 
      render: (val) => <img src={getImageUrl(val)} alt="city" className={styles.thumb} /> 
    },
  ];

  const fields = [
    { name: "name", label: "City Name", placeholder: "e.g. Amman" },
    { name: "image", label: "City Image", type: "file" },
  ];

  const handleAdd = (data) => {
    addCity(data, {
      onSuccess: () => setIsOpen(false)
    });
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsOpen(true);
  };

  const handleUpdate = (data) => {
    updateCity({ id: editItem._id, ...data }, {
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

  if (fetchingCities) return <Spinner />;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <header><Title size="xl" mb="0">Manage Cities</Title></header>
        <Button onClick={handleCloseModal} className={styles.addBtn}>
          <span className={styles.icon}><MdAdd /></span> 
          <span className={styles.text}>Add City</span>
        </Button>
      </header>

      <DataTable 
        columns={columns} 
        data={citiesData?.data} 
        onDelete={deleteCity}
        onEdit={handleEdit}
      />

      {isOpen && (
        <Modal ref={cityRef} setOpen={setIsOpen}>
          <AdminForm 
            title={editItem ? "Edit City" : "Add New City"}
            fields={fields} 
            defaultValues={editItem ? { name: editItem.name, image: editItem.image } : {}}
            onSubmit={editItem ? handleUpdate : handleAdd}
            isLoading={editItem ? updatingCity : addingCity}
            isEdit={!!editItem}
          />
        </Modal>
      )}
    </div>
  );
}
