import Cookies from "universal-cookie";

const cookies = new Cookies();

export function useAuthEmail() {
    const value = cookies.get("TOKEN");
    return value;
}