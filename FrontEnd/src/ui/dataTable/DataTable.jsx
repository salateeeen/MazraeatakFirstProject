import styles from "./DataTable.module.css";
import EditButton from "@/ui/icons/EditButton";
import DeleteButton from "@/ui/icons/DeleteButton";
import Empty from "../empty/Empty";

export default function DataTable({ 
  columns, 
  data, 
  isPending, 
  error, 
  onDelete, 
  onEdit, 
  renderActions,
  resourceName = "item"
}) {

  if (isPending) return <Spinner size="lg" />;
  if (error) return <Error message={error.message} />;
  if (!data?.length) return <Empty title={`No ${resourceName} found`} />;

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.indexCol}>#</th>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete || renderActions) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id || index}>
              <td className={styles.indexCol}>{index + 1}</td>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
              {(onEdit || onDelete || renderActions) && (
                <td>
                  <div className={styles.actions}>
                    {renderActions ? renderActions(item) : (
                      <>
                        {onEdit && (
                          <EditButton onClick={() => onEdit(item)} />
                        )}
                        {onDelete && (
                          <DeleteButton 
                            id={item._id} 
                            onDelete={onDelete} 
                            resourceName={resourceName}
                          />
                        )}
                      </>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
