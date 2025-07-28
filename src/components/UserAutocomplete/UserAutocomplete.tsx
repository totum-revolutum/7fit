import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchUsersForAdminSearch } from "@/api/scheduleApi"; // ⚠️ Залежить куди додала

type UserOption = {
  user_id: string;
  user_name: string;
  user_email?: string;
};

interface Props {
  value: UserOption | null;
  onChange: (user: UserOption | null) => void;
}

const UserAutocomplete = ({ value, onChange }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    if (inputValue.length < 2) return;

    setLoading(true);
    fetchUsersForAdminSearch(inputValue)
      .then((users) => {
        if (active) setOptions(users);
      })
      .catch(console.error)
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [inputValue]);

  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      options={options}
      getOptionLabel={(option) => option.user_name || ""}
      isOptionEqualToValue={(option, val) => option.user_id === val.user_id}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Пошук користувача"
          placeholder="Введіть імʼя або email"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      noOptionsText="Не знайдено"
    />
  );
};

export default UserAutocomplete;
