import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

    interface CustomSelectProps {
        options: { id: number| string; value: string| number; label: string }[];
        placeholder?: string;
        label: string;
        onValueChange: (value: string ) => void;
        newValue?: string|number;
        defaultValue?: string;
        name?: string;
    }

export const SelectComponent = ({options, placeholder, label, onValueChange, newValue, defaultValue, name}:CustomSelectProps ) => {
        const safeValue = newValue?.toString() || "";
    return(
        <Select onValueChange={onValueChange} value={safeValue} name={name}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder}></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel defaultValue={defaultValue}>{label}</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option.id} value={option.value.toString()}>{option.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}