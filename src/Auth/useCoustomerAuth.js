import { useDispatch } from "react-redux";
import { BASE_URL } from "../Api/api";
import { login, notLogin } from "../App/features/customerAuthSlice";

const useCoustomerAuth = () => {

    const dispatch = useDispatch()

    const customerDataLocalStrg = localStorage.getItem("customerAuthData");

    if (customerDataLocalStrg) {
    const customerData = JSON.parse(customerDataLocalStrg);
    const { email, password } = customerData;

    fetch(`${BASE_URL}/customers`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.status);
            } else {
                return res.json();
            }
        })
        .then((data) => {
            const userInfo = data.find((info) => info.email === email && info.password === password && info.status === 'active' );

            if (userInfo) {
                dispatch(login(userInfo));
            } else {
                dispatch(notLogin())
            }
        })
        .catch((err) => {
            if(err){
                console.log(err);
                dispatch(notLogin())
            }
        });
    } else {
        dispatch(notLogin())
    }
};

export default useCoustomerAuth