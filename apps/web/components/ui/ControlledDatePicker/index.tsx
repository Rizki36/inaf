import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Control, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IControlledDatePickerProps {
    name: string;
    label: string;
    control: Control<any>;
}
const ControlledDatePicker = (props: IControlledDatePickerProps) => {
    const { control, name, label } = props;
    return (
        <Controller
            control={control}
            name={name}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
            }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label={label}
                        value={value}
                        onChange={(newValue) => {
                            onChange(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                fullWidth
                                variant={"standard"}
                                onBlur={onBlur}
                                margin="normal"
                                error={Boolean(error?.message)}
                                helperText={error?.message}
                            />
                        )}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default ControlledDatePicker;
