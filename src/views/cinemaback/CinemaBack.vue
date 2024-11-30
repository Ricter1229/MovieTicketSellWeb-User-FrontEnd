<template>
    <section class="body">

        <!-- <section class="top">
            <form action="" class="search">
                <input type="text" placeholder="店名">
                <button>搜尋</button>
            </form>
            <form action="" class="search">
                <select name="" id="">
                    <option value="">北部</option>
                    <option value="">中部</option>
                    <option value="">南部</option>
                </select>
                <select name="" id="" class="sl">
                    <option value="">oo店</option>
                    <option value="">oo店</option>
                    <option value="">oo店</option>
                </select>
                <button>搜尋</button>
            </form>
        </section> -->
        <CinemaSearch></CinemaSearch>
        <main>
            <section class="main_sec">
                
                <button class="btn btn-secondary insert" type="button"  @click="openModal('insert')">新增</button>
                
                <table class="table main_table">
        <thead class="table-light main_thead">
            <tr>
                <th></th>
                <th>影城名稱</th>
                <th class="address">影城地址</th>
                <th>聯絡方式</th>
                <th></th>
            </tr>
        </thead>
        <tbody class="main_tbody">
            <!-- <tr>
                <td>
                    <button type="button" class="btn btn-light">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </button>
                </td>
                <td>aaa店</td>
                <td>台北市信義區松壽路20號</td>
                <td>1234567890</td>
                <td>
                    <button type="button" class="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </td>
            </tr>
            <tr>
                <td>
                    <button type="button" class="btn btn-light">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </button>
                </td>
                <td>bbb店</td>
                <td>台北市信義區松壽路20號</td>
                <td>1234567890</td>
                <td>
                    <button type="button" class="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </td>
            </tr>
            <tr>
                <td>
                    <button type="button" class="btn btn-light">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </button>
                </td>
                <td>ccc店</td>
                <td>台北市信義區松壽路20號</td>
                <td>1234567890</td>
                <td>
                    <button type="button" class="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </td>
            </tr> -->

            <CinemaStoresFind v-for="cinema in cinemas" :key="cinema.id" :item="cinema" @open-update="openModal" @delete="callRemove"></CinemaStoresFind>

        </tbody>
    </table>
                <CinemaModal ref="cinemaModalRef" v-model:cinema="cinema" :is-show-insert-button="isShowInsertButton" @insert="callCreate" @update="callModify"></CinemaModal>
            </section>
            <div>{{ cinema.name }}</div>
        </main>
    </section>
    
</template>
    
<script setup>
    import CinemaSearch from './CinemaSearch.vue';
    import CinemaStoresFind from './CinemaStoresFind.vue';
    import CinemaModal from './CinemaModal.vue';
    import { ref } from 'vue';
    import { onMounted } from 'vue';
    const cinemas=ref([
        {name:"ccc店",address:"台北市信義區松壽路20號",phoneNo:"1234567890",region:"南"},
        {name:"ccc店",address:"台北市信義區松壽路20號",phoneNo:"1234567890",region:"南"},
    ]);
    const cinema=ref({});
    const isShowInsertButton=ref(true);
    const cinemaModalRef=ref(null);

    function openModal(action,id){
        if(action==="insert"){
            isShowInsertButton.value=true;
            cinema.value={};
            console.log(cinema.value);
        }else{
            isShowInsertButton.value=false;
            cinema.value={name:"ccc店",address:"台北市信義區松壽路20號",phoneNo:"1234567890",region:"南",introduce:"dsadasdadaffafafad"};
            console.log(cinema.value);
            // callFindById(id);

        }
        cinemaModalRef.value.showModal();
    }
    
    //網頁分頁
    // import Paginate from 'vuejs-paginate-next';

    // const findName=ref("");
    // const total=ref(0);
    // const pages=ref(10);
    // const current=ref(1);
    // const start=ref(0);
    // const max=ref(4);
    // const lastPageRows=ref(0);

    // onMounted(function(){
    //     callFind();
    // });

    // async function callFind(page) {
    //         //計算分頁
    //         if(page){
    //             start.value=(page-1)*max.value;
    //             current.value=page;
    //         }else{
    //             start.value=0;
    //             current.value=0;
    //         }

    //         //整理使用者資料
    //         if(findName.value===""){
    //             findName.value=null;
    //         }
    //         let request={
    //             start:start.value,
    //             max:max.value,
    //             dir:false,order:"id",
    //             name:findName.value
    //         }

    //         Swal.fire({
    //             title: "Loading.....",
    //             showConfirmButton: false,
    //             allowOutsideClick: false,
    //         });
            
    //         axios.post("/ajax/pages/products/find", request).then(function(response) {
    //             //分頁start
    //             total.value=response.data.count;
    //             pages.value=Math.ceil(total.value/max.value);
    //             lastPageRows.value=total.value%max.value;
                

    //             console.log("response", response.data.count);
    //             console.log("response", response.data.list);
    //             setTimeout(function() {
    //                 products.value=response.data.list;
    //                 Swal.close();
    //             }, 500);
    //         }).catch(function(error) {
    //             console.log("error", error);
    //             Swal.fire({
    //                 icon: "error", //success, error, warning, info, question,,,,
    //                 title: "查詢失敗:"+ error.message,
    //             });
    //         });
    //     }
</script>
    
<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .body{
        background-color: rgb(231, 228, 228);
        height:1000px;
        width: 100%;
    }
    .main_table{
        margin-top: 20px;
        width: 1200px;
    }
    .main_thead{
        height: 50px;
    }
    .main_thead>tr>th{
        text-align: center;
    }
    .insert{
        width: 300px;
    }
    .main_sec{
        display: flex;
        justify-content:center;
        align-items: center;
        flex-direction: column;
        margin-top: 50px;
    }
</style>