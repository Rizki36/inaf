import { IOption } from "@/types/index";
import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface IControlledAutoCompleteProps {
    name: string;
    label: string;
    control: Control<any>;
    options: IOption[];
}

const ControlledAutocomplete = (props: IControlledAutoCompleteProps) => {
    const { name, label, control, options } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, onBlur },
                fieldState: { error },
            }) => (
                <Autocomplete
                    id={name}
                    options={options}
                    onChange={(e, v) => {
                        if (typeof v !== "string") onChange(v.value);
                    }}
                    getOptionLabel={(option) => option.label || ""}
                    isOptionEqualToValue={(o, v) => o.value === v.value}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            variant={"standard"}
                            onBlur={onBlur}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                        />
                    )}
                />
            )}
        />
    );
};

export default ControlledAutocomplete;
