import { useRef, useState } from "react";
import styles from "./AdminResources.module.css";
import { useAdminCategories, useAddCategory, useDeleteCategory, useUpdateCategory } from "@/ui/categories/hooks/useCategories";
import DataTable from "../../../ui/dataTable/DataTable";
import AdminForm from "../forms/AdminForm";
import Modal from "@/ui/modal/Modal";
import Button from "@/ui/button/Button";
import Spinner from "@/ui/spinner/Spinner";
import { MdAdd } from "react-icons/md";
import Title from "@/ui/title/Title";
import { useCloseComponents } from "@/hooks/useCloseComponents";
import { IMAGE_URL } from "@/services/apiConfig";


export default function AdminCategories() {
  const categoryRef = useRef(null);
  const [isOpen, setIsOpen] = useCloseComponents(categoryRef);
  
  const { data: categoriesData, isPending: fetchingCategories } = useAdminCategories();
  const { mutate: addCategory, isPending: addingCategory } = useAddCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: updateCategory, isPending: updatingCategory } = useUpdateCategory();
  const [editItem, setEditItem] = useState(null);

  const columns = [
    { key: "name", label: "Category Name" },
    { 
      key: "image", 
      label: "Image", 
      render: (val) => <img src={val} alt="category" className={styles.thumb} /> 
    },
  ];

  const fields = [
    { name: "name", label: "Category Name", placeholder: "e.g. Luxury" },
    { name: "image", label: "Category Image", type: "file" },
  ];

  const handleAdd = (data) => {
    addCategory(data, {
      onSuccess: () => setIsOpen(false)
    });
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsOpen(true);
  };

  const handleUpdate = (data) => {
    updateCategory({ id: editItem._id, ...data }, {
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

  if (fetchingCategories) return <Spinner />;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Title size="xl" mb="0">Manage Categories</Title>
        <Button onClick={handleCloseModal} className={styles.addBtn}>
          <span className={styles.icon}><MdAdd /></span> 
          <span className={styles.text}>Add Category</span>
        </Button>
      </header>

      <DataTable 
        columns={columns} 
        data={categoriesData?.data} 
        onDelete={deleteCategory}
        onEdit={handleEdit}
      />

      {isOpen && (
        <Modal ref={categoryRef} setOpen={setIsOpen}>
          <AdminForm 
            title={editItem ? "Edit Category" : "Add New Category"}
            fields={fields} 
            defaultValues={editItem ? { name: editItem.name, image: editItem.image } : {}}
            onSubmit={editItem ? handleUpdate : handleAdd}
            isLoading={editItem ? updatingCategory : addingCategory}
            isEdit={!!editItem}
          />
        </Modal>
      )}
    </div>
  );
}
