import { useDispatch } from "react-redux";
import { BASE_URL } from "../Api/api";
import { login, notLogin } from "../App/features/adminAuthSlice";

const useAdminAuth = () => {

    const dispatch = useDispatch()

    const adminDataLocalStrg = localStorage.getItem("adminAuthData");

    if (adminDataLocalStrg) {
    const adminData = JSON.parse(adminDataLocalStrg);
    const { email, password } = adminData;

    fetch(`${BASE_URL}/users`)
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

export default useAdminAuth;
