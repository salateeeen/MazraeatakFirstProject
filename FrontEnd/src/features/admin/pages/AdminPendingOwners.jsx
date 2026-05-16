import styles from "./AdminResources.module.css";
import { usePendingOwners, useApproveOwner, useRejectOwner } from "../hooks/useAdminOwners";
import DataTable from "../../../ui/dataTable/DataTable";
import Spinner from "@/ui/spinner/Spinner";
import Button from "@/ui/button/Button";
import { useConfirm } from "@/context/ConfirmContext";
import Error from "@/ui/error/Error";
import Title from "@/ui/title/Title";
import { useState, useRef } from "react";
import Modal from "@/ui/modal/Modal";
import { useCloseComponents } from "@/hooks/useCloseComponents";

export default function AdminPendingOwners() {
  const confirm = useConfirm();
  const [selectedOwner, setSelectedOwner] = useState(null);
  const modalRef = useRef();
  const [isModalOpen, setIsModalOpen] = useCloseComponents(modalRef);

  const { data: pendingOwnersData, isPending: fetchingPendingOwners, error } = usePendingOwners();
  const approveMutation = useApproveOwner();
  const rejectMutation = useRejectOwner();

  if (fetchingPendingOwners) return <Spinner size="lg" />;
  if (error) return <Error message={error.message} />;

  const pendingOwners = pendingOwnersData?.data || [];

  const handleReject = async (id) => {
    const isConfirmed = await confirm({
      title: "Reject Request",
      message: "Are you sure you want to reject this owner request?",
      confirmLabel: "Reject",
      danger: true
    });
    
    if (isConfirmed) rejectMutation.mutate(id);
  };

  const handleView = (owner) => {
    setSelectedOwner(owner);
    setIsModalOpen(true);
  };

  const columns = [
    { 
      key: "user", 
      label: "User", 
      render: (user) => `${user?.firstName} ${user?.lastName}` 
    },
    { key: "businessName", label: "Business Name" },
    { key: "phone", label: "Phone" },
    { 
      key: "createdAt", 
      label: "Requested On", 
      render: (date) => new Date(date).toLocaleDateString() 
    },
  ];

  const renderActions = (item) => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button 
        size="small" 
        onClick={() => handleView(item)}
        secondary
      >
        View
      </Button>
      <Button 
        size="small" 
        onClick={() => approveMutation.mutate(item._id)}
        disabled={approveMutation.isPending}
      >
        Approve
      </Button>
      <Button 
        secondary
        size="small" 
        onClick={() => handleReject(item._id)}
        disabled={rejectMutation.isPending}
        style={{ color: "var(--color-red-600)" }}
      >
        Reject
      </Button>
    </div>
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Title size="xl" mb="0">Pending Owner Requests</Title>
      </header>

      <DataTable 
        columns={columns} 
        data={pendingOwners} 
        renderActions={renderActions}
        resourceName="request"
      />

      {isModalOpen && selectedOwner && (
        <Modal setOpen={setIsModalOpen} ref={modalRef} className={styles.detailsModal}>
          <div className={styles.modalBody}>
            <Title size="lg" mb="1.5rem">Request Details</Title>
            
            <div className={styles.detailRow}>
              <strong>Business Name:</strong> <span>{selectedOwner.businessName}</span>
            </div>
            <div className={styles.detailRow}>
              <strong>Requester:</strong> <span>{selectedOwner.user?.firstName} {selectedOwner.user?.lastName} ({selectedOwner.user?.email})</span>
            </div>
            <div className={styles.detailRow}>
              <strong>Phone:</strong> <span>{selectedOwner.phone}</span>
            </div>
            <div className={styles.detailRow}>
              <strong>Social Media:</strong> <span>{selectedOwner.socialMedia || "N/A"}</span>
            </div>
            <div className={styles.detailRow}>
              <strong>Experience:</strong>
              <p className={styles.detailText}>{selectedOwner.experience}</p>
            </div>
            <div className={styles.detailRow}>
              <strong>Description:</strong>
              <p className={styles.detailText}>{selectedOwner.description || "No description provided."}</p>
            </div>

            <div className={styles.modalActions}>
              <Button 
                onClick={() => {
                   approveMutation.mutate(selectedOwner._id);
                   setIsModalOpen(false);
                }}
                disabled={approveMutation.isPending}
              >
                Approve
              </Button>
              <Button 
                secondary
                onClick={() => {
                  handleReject(selectedOwner._id);
                  setIsModalOpen(false);
                }}
                disabled={rejectMutation.isPending}
              >
                Reject
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
