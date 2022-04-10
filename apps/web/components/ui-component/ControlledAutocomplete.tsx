import { IOption } from "@/types/index";
import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface IControlledAutoCompleteProps {
    name: string;
    label: string;
    control: Control<any>;
    options: IOption[];
    defaultValue?: string;
    disabled?: boolean;
}

const ControlledAutocomplete = (
    props: IControlledAutoCompleteProps & TextFieldProps
) => {
    const { name, label, control, options, disabled = false } = props;

    const getCurrentOption = (value) => {
        return options.find((option) => option.value === value);
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
            }) => (
                <Autocomplete
                    id={name}
                    options={options}
                    onChange={(e, v) => {
                        if (!v) return onChange(null);
                        if (typeof v !== "string") return onChange(v?.value);
                    }}
                    value={getCurrentOption(value)}
                    disabled={disabled}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            variant={"standard"}
                            onBlur={onBlur}
                            margin="normal"
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
