import { defineStore } from "pinia";
import { ref } from "vue";

const useUsersStore = defineStore("userData", function() {
    const account = ref("");
    function setAccount(val) {
        account.value = val;
    }
    
    const email = ref("");
    function setEmail(val) {
        email.value = val;
    }

    const phone = ref("");
    function setPhone(val) {
        phone.value = val;
    }

    const birthDate = ref("");
    function setBirthDate(val) {
        birthDate.value = val;
    }

    const isLogin = ref(false);
    function setLogin(val) {
        isLogin.value = val;
    }

    function logout() {
        email.value = "";
        isLogin.value = false;
        sessionStorage.removeItem("userData");
    }

    return {
        account, setAccount, email, setEmail, phone, setPhone, birthDate, setBirthDate, isLogin, setLogin, logout,
    }
}, {
    persist: {
        storage: sessionStorage,
        paths: ["account", "email", "phone", "birthDate", "isLogin"]
    }
});

export default useUsersStore;
