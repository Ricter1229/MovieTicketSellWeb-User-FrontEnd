<template>
    <div class="user-container">
        <h2>使用者資料</h2>
        <div v-if="user">
            <p><strong>名稱：</strong>{{ user.account }}</p>
            <p><strong>電子郵件：</strong>{{ user.email }}</p>
            <p><strong>生日：</strong>{{ formattedBirthDate }}</p>
            <p><strong>電話：</strong>{{ user.phone }}</p>
            <button @click="showUserModal">修改</button>
        </div>
        <div v-else>
            <p>載入中...</p>
        </div>

        <UserModal ref="userModal" :user="tempUser" :isShowInsertButton="false" @update:user="updateTempUser" @confirm="confirmUpdate" />

        <div class="password-reset">
            <h3>重設密碼</h3>
            <div>
                <label for="originalPwd">原密碼：</label>
                <input type="password" id="originalPwd" v-model="originalPwd">
            </div>
            <div>
                <label for="newPwd">新密碼：</label>
                <input type="password" id="newPwd" v-model="newPwd">
            </div>
            <div>
                <label for="confirmPwd">確認新密碼：</label>
                <input type="password" id="confirmPwd" v-model="confirmPwd">
            </div>
            <button @click="resetPassword">重設密碼</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import axiosapi from "@/plugins/axios.js"
    import Swal from 'sweetalert2';
    import UserModal from '@/components/UserModal.vue';

    const user = ref(null);
    const tempUser = ref(null);
    const userModal = ref(null);

    const originalPwd = ref('');
    const newPwd = ref('');
    const confirmPwd = ref('');

    onMounted(() => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if (userData) {
            user.value = userData;
            tempUser.value = { ...userData };
        } else {
            console.error('No user data found in sessionStorage');
        }
    });

    const formattedBirthDate = computed(() => {
        return user.value?.birthDate ? user.value.birthDate.split(' ')[0] : '';
    });

    function showUserModal() {
        tempUser.value = { ...user.value };
        userModal.value.showModal();
    }

    function updateTempUser(updatedUser) {
        tempUser.value = updatedUser;
    }

    function confirmUpdate() {
        if (tempUser.value.phone.length != 10 || new Date(tempUser.value.birthDate) > new Date()) {
            Swal.fire({
                icon: 'error',
                title: '格式錯誤',
                text: '請確認輸入是否正確。',
            });
            return;
        }

        const originName = user.value.account;
        user.value = { ...tempUser.value };

        axiosapi.put(`/user/${user.value.id}`, user.value).then(response => {
            console.log(response);
            if (response.data.count == 0) {
                Swal.fire({
                    icon: 'error',
                    title: '更新失敗',
                    text: '使用者名稱已存在',
                });
                user.value.account = originName;
            } else {
                Swal.fire({
                    icon: 'success',
                    title: '更新成功',
                    text: '使用者資料已成功更新。',
                });

                sessionStorage.setItem('userData', JSON.stringify(user.value));
                userModal.value.hideModal();
            }
        }).catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: '更新失敗',
                text: '使用者資料更新失敗。',
            });
        });
    }

    const resetPassword = () => {
        if (newPwd.value === "") {
            Swal.fire({ icon: "warning", title: "請輸入新密碼！" });
            return;
        } else if (newPwd.value.length < 8) {
            Swal.fire({ icon: "warning", title: "密碼長度至少8位！" });
            return;
        } else if (!/[a-z]/.test(newPwd.value) || !/[0-9]/.test(newPwd.value)) {
            Swal.fire({ icon: "warning", title: "密碼必須包含字母和數字！" });
            return;
        }

        if (newPwd.value !== confirmPwd.value) {
            Swal.fire('錯誤', '新密碼與確認密碼不一致', 'error');
            return;
        }

        axiosapi.post('/ajax/secure/new-password', {
            account: user.value.account,
            email: user.value.email,
            originalPwd: originalPwd.value,
            newPwd: newPwd.value
        }).then(response => {
            if (response.data.message == 'incorrect password') {
                Swal.fire('錯誤', '原密碼錯誤', 'error');
            } else {
                Swal.fire('成功', '密碼已重設', 'success');
            }

            originalPwd.value = '';
            newPwd.value = '';
            confirmPwd.value = '';
        }).catch(error => {
            Swal.fire('錯誤', '發生錯誤', 'error');
        });
    };
</script>

<style scoped>
.user-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
    color: #333;
}

.user-details {
    margin-top: 20px;
}
</style>