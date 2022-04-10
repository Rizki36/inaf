import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";

// interface IControlledTextFieldProps extends TextFieldProps {
//     name: string;
//     label: string;
//     control: Control<any>;
//     type?: React.InputHTMLAttributes<unknown>["type"];
//     variant?: "standard" | "outlined" | "filled";
//     multiline?: boolean;
//     minRows?: number;
// }
interface IControlledTextFieldProps {
    name: string;
    label: string;
    control: Control<any>;
}

const ControlledTextField = (
    props: IControlledTextFieldProps & TextFieldProps
) => {
    const { control, name, label, type = "text", variant = "standard" } = props;
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    label={label}
                    fullWidth
                    type={type}
                    margin="normal"
                    variant={variant}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    {...props}
                />
            )}
        />
    );
};

export default ControlledTextField;
