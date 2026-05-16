import { useCategories } from "../hooks/useCategories";
import Select from "@/ui/forms/select/Select";

export default function SelectCategory() {
  const { data: categories, isPending, error } = useCategories();

  const categoriesOptions = categories?.data?.map(({ _id, name }, i) => {
    return { value: _id, label: name };
  });

  return (
    <>
      {!isPending && !error && (
        <Select name={`category`} options={categoriesOptions} />
      )}
    </>
  );
}
