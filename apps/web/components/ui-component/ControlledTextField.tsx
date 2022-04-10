import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface IControlledTextFieldProps {
    name: string;
    label: string;
    control: Control<any>;
}
const ControlledTextField = (props: IControlledTextFieldProps) => {
    const { control, name, label } = props;
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    label={label}
                    fullWidth
                    margin="normal"
                    variant="standard"
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default ControlledTextField;
