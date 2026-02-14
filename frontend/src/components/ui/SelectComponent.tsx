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
        onValueChange?: (value: string ) => void;
        newValue?: string;
        defaultValue?: string;
        name?: string;
        isresetedValues?: boolean;
    }



export const SelectComponent = ({options, placeholder, label, onValueChange, defaultValue, name, newValue}:CustomSelectProps ) => {
    return(
        <Select onValueChange={onValueChange} value={newValue} defaultValue={defaultValue} name={name}>
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