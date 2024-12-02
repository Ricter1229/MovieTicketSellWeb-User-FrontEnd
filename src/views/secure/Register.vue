<template>
    <div class="register-container">
        <h3 v-if="!isVerificationStep">註冊</h3>
        <h3 v-else>驗證電子郵件</h3>

        <form v-if="!isVerificationStep">
            <div class="form-group">
                <label for="username">帳號：</label>
                <input type="text" id="username" v-model="username" @focus="clearError('username')">
                <span class="error-message">{{ errors.username }}</span>
            </div>
            <div class="form-group">
                <label for="password">密碼：</label>
                <input type="password" id="password" v-model="password" @focus="clearError('password')">
                <span class="error-message">{{ errors.password }}</span>
            </div>
            <div class="form-group">
                <label for="email">信箱：</label>
                <input type="email" id="email" v-model="email" @focus="clearError('email')">
                <span class="error-message">{{ errors.email }}</span>
            </div>
            <div class="form-group">
                <label for="phoneNum">手機號碼：</label>
                <input type="text" id="phoneNum" v-model="phoneNum" @focus="clearError('phoneNum')">
                <span class="error-message">{{ errors.phoneNum }}</span>
            </div>
            <div class="form-group">
                <label for="birthDate">生日：</label>
                <input type="date" id="birthDate" v-model="birthDate" @focus="clearError('birthDate')">
                <span class="error-message">{{ errors.birthDate }}</span>
            </div>
            <div class="form-group">
                <button type="button" @click="register()">註冊</button>
            </div>
        </form>

        <form v-else>
            <div class="form-group">
                <label for="validationCode">驗證碼：</label>
                <input type="text" id="validationCode" v-model="validationCode" @focus="clearError('validationCode')">
                <span class="error-message">{{ errors.validationCode }}</span>
            </div>
            <div class="form-group">
                <button type="button" @click="verifyCode()">確認驗證碼</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosapi from "@/plugins/axios.js";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref(null);
const password = ref(null);
const email = ref(null);
const phoneNum = ref(null);
const birthDate = ref(null);

const validationCode = ref(null);
const isVerificationStep = ref(false);

const errors = ref({
    username: null,
    password: null,
    email: null,
    phoneNum: null,
    birthDate: null,
    validationCode: null,
});

function clearError(field) {
    errors.value[field] = null;
}

async function register() {
    Swal.fire({
        title: "Registering.....",
        showConfirmButton: false,
        allowOutsideClick: false,
    });

    for (let key in errors.value) {
        errors.value[key] = null;
    }

    if (!username.value) errors.value.username = "Username is required";
    if (!password.value) errors.value.password = "Password is required";
    if (!email.value) errors.value.email = "Email is required";
    if (!phoneNum.value) errors.value.phoneNum = "Phone number is required";
    if (!birthDate.value) errors.value.birthDate = "Birth date is required";

    if (Object.values(errors.value).some((error) => error)) {
        Swal.close();
        return;
    }

    let request = {
        account: username.value,
        password: password.value,
        email: email.value,
        phoneNo: phoneNum.value,
        birthDate: birthDate.value,
    };

    try {
        const response = await axiosapi.post("/ajax/secure/register-temp", request);

        if (response.data.success) {
            sessionStorage.setItem("userData", JSON.stringify(request));
            sessionStorage.setItem("validationCode", response.data.validationCode);
            const expirationTime = new Date().getTime() + 60 * 5 * 1000; // 5 minutes expiration
            sessionStorage.setItem("codeExpiration", expirationTime);
            isVerificationStep.value = true;
            Swal.fire({
                icon: "success",
                title: "註冊成功！請檢查您的電子郵件以取得驗證碼。",
            });
        } else {
            Swal.fire({
                icon: "warning",
                title: response.data.message,
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Registration failed: " + error.message,
        });
    }
}

function verifyCode() {
    const storedCode = sessionStorage.getItem("validationCode");
    const storedExpiration = sessionStorage.getItem("codeExpiration");
    const currentTime = new Date().getTime();

    if (currentTime > storedExpiration) {
        Swal.fire({ icon: "error", title: "驗證碼已過期，請重新登入。" });
        isVerificationStep.value = false;
        return;
    }

    if (validationCode.value != storedCode) {
        errors.value.validationCode = "驗證碼錯誤";
    } else {
        const request = sessionStorage.getItem("userData");
        completeRegistration(request);
    }
}

async function completeRegistration(request) {
    const response = await axiosapi.post("/ajax/secure/confirm-registration", JSON.parse(request));

    try {
        Swal.fire({
            icon: "success",
            title: "註冊成功！",
        }).then(() => {
            router.push({ name: "login-link" });
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Finalization failed: " + error.message,
        });
    }

    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("validationCode");
    sessionStorage.removeItem("codeExpiration");
}
</script>

<style scoped>
.register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
}

h3 {
    text-align: center;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #333;
}

input[type="text"],
input[type="password"],
input[type="email"],
input[type="date"] {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

.error-message {
    color: red;
    font-size: 0.9em;
}
</style>