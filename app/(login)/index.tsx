import { Input } from "@/components/inputs/input";
import { useForm } from "react-hook-form";
import { Container } from "./styles";

export default function Login() {
    const { control } = useForm();
    return (
        <Container>
            <Input
                name="email"
                placeholder="exemplo@gmail.com"
                control={control}
            />
        </Container>
    )
};