import { useCities } from "../hooks/useCities";
import Select from "@/ui/forms/select/Select";

export default function SelectCity({ onChange }) {
  const { data: cities, isPending, error } = useCities();
  const citiesData = cities?.data;
  
  const citiesOptions = citiesData?.map(({ _id, name }, i) => {
    return { value: _id, label: name };
  });

  return (
    <>
      {!isPending && !error && <Select name={`city`} options={citiesOptions} onChange={onChange} />}
    </>
  );
}
