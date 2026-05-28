import styles from "./FarmsFilter.module.css";
import { memo, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useCategories } from "@/ui/categories/hooks/useCategories";
import { useCities } from "@/ui/cities/hooks/useCities";
import { useFacilities } from "@/ui/facilities/hooks/useFacilities";

const RATING_OPTIONS = [
  { value: "5", label: "5 Stars" },
  { value: "4", label: "4 Stars & Up" },
  { value: "3", label: "3 Stars & Up" },
  { value: "2", label: "2 Stars & Up" },
];

const PRICE_RANGES = [
  { value: "0-50", label: "Under 50 JOD" },
  { value: "50-100", label: "50 - 100 JOD" },
  { value: "100-200", label: "100 - 200 JOD" },
  { value: "200-500", label: "200 - 500 JOD" },
  { value: "500+", label: "Over 500 JOD" },
];

function FilterSection({ title, children }) {
  return (
    <div className={styles.section}>
      <h4 className={styles.sectionTitle}>{title}</h4>
      <div className={styles.checkboxList}>{children}</div>
    </div>
  );
}

function CheckboxItem({ name, value, label, type = "checkbox" }) {
  const { register } = useFormContext();
  return (
    <label className={styles.checkboxItem}>
      <input
        type={type}
        value={value}
        {...register(name)}
        className={styles.checkbox}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

function FarmsFilter() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const { data: categories } = useCategories();
  const { data: cities } = useCities();
  const { data: facilities } = useFacilities();

  const filterForm = useForm({
    defaultValues: {
      category: searchParams.getAll("category[in]") || [],
      city: searchParams.getAll("city[in]") || [],
      rating: searchParams.getAll("ratingsAverage[in]") || [],
      priceRange: searchParams.getAll("priceRange") || [],
      facilities: searchParams.getAll("facilities[all]") || [],
    },
  });

  useEffect(() => {
    const subscription = filterForm.watch((values) => {
      onSubmitFilter(values);
    });
    return () => subscription.unsubscribe();
  }, [filterForm]);


  function onSubmitFilter(data) {
    const params = new URLSearchParams();

    if (Array.isArray(data.category)) {
      data.category.forEach((c) => params.append("category[in]", c));
    }
    
    if (Array.isArray(data.city)) {
      data.city.forEach((c) => params.append("city[in]", c));
    }

    if (Array.isArray(data.rating)) {
      data.rating.forEach((r) => params.append("ratingsAverage[gte]", r));
    }
    
    if (Array.isArray(data.priceRange) && data.priceRange.length > 0) {
      let minPrice = Infinity;
      let maxPrice = -Infinity;
      let hasPlus = false;

      data.priceRange.forEach((range) => {
        params.append("priceRange", range);
        const [min, max] = range.split("-");
        minPrice = Math.min(minPrice, parseInt(min));
        if (max === "+") {
          hasPlus = true;
        } else {
          maxPrice = Math.max(maxPrice, parseInt(max));
        }
      });

      params.set("basePrice[gte]", minPrice);
      if (!hasPlus) {
        params.set("basePrice[lte]", maxPrice);
      }
    }

    if (Array.isArray(data.facilities)) {
      data.facilities.forEach((f) => {
        params.append("facilities[all]", f);
      });
    }

    // Preserve sort params if they exist
    const sort = searchParams.get("sort");
    const order = searchParams.get("order");
    if (sort) params.set("sort", sort);
    if (order) params.set("order", order);

    navigate(`?${params.toString()}`, { replace: true });
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Filters</h3>
      <FormProvider {...filterForm}>
        <form className={styles.filters}>
          
          <FilterSection title="Categories">
            {categories?.data?.map((cat) => (
              <CheckboxItem
                key={cat._id}
                name="category"
                value={cat._id}
                label={cat.name}
              />
            ))}
          </FilterSection>

          <FilterSection title="Cities">
            {cities?.data?.map((city) => (
              <CheckboxItem
                key={city._id}
                name="city"
                value={city._id}
                label={city.name}
              />
            ))}
          </FilterSection>

          <FilterSection title="Budget (Per Day)">
            {PRICE_RANGES.map((range) => (
              <CheckboxItem
                key={range.value}
                name="priceRange"
                value={range.value}
                label={range.label}
              />
            ))}
          </FilterSection>

          <FilterSection title="Guest Rating">
            {RATING_OPTIONS.map((opt) => (
              <CheckboxItem
                key={opt.value}
                name="rating"
                value={opt.value}
                label={opt.label}
              />
            ))}
          </FilterSection>

          <FilterSection title="Facilities">
            {facilities?.data?.map((fac) => (
              <CheckboxItem
                key={fac._id}
                name="facilities"
                value={fac._id}
                label={fac.name}
              />
            ))}
          </FilterSection>

        </form>
      </FormProvider>
    </div>
  );
}

export default memo(FarmsFilter);
