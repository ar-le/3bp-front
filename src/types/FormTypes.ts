export interface InputProps {
    label: string,
    name: string,
    id: string,
    theme?: "light" | "dark"
    ref? : React.Ref<HTMLInputElement| null>
}