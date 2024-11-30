<template>
    <section class="cinemawrap">
        <section class="head_left">
                <!-- <select name="" id="" class="sl">
                    <option value="">北部</option>
                    <option value="">中部</option>
                    <option value="">南部</option>
                </select>
                <select name="" id="" class="sl">
                    <option value="">oo店</option>
                    <option value="">oo店</option>
                    <option value="">oo店</option>
                </select> -->
                <CinemaRunFilter></CinemaRunFilter>
            <img src="@/assets/images/1.jpg" alt="" class="image">
            <section class="left_wrap">               
                <!-- <Carousel v-bind="config" style="width: 450px;">
                    <Slide v-for="(img,index) in imgs" :key="index">

                    <img :src="img.src" class="ph">
                    </Slide>

                    <template #addons>
                    <Navigation />
                    </template>
                </Carousel> -->
                <CinemaSubsTurn></CinemaSubsTurn>              
            </section>
                    
        </section>
        <section class="head_middle">
            <!-- <p class="middle_p sub_title">北部</p>
                <p class="middle_p sub_title">oo影城xx店</p>
            <section class="p_wrap">
                    
                <p class="middle_p intro">台北信義威秀影城內有時髦前衛、聲光炫麗的裝潢，為全國第一座專門為放映電影而量身打造的建築設計，提供了由現成建築物改裝的傳統電影院無法擁有的舒適視聽空間。

                本據點共15座影廳2,693席座位、40席無障礙座位，內含：
                1座4DX影廳 140個座位</p>
                <p class="middle_p intro">世界上最棒的影廳之一的4DX影廳，威秀影城2013年獨家引進，打造『台北信義威秀影城』全台首座4DX影廳，帶給您世界級的最新影音感官全體驗效果。</p>
                <p class="middle_p intro"> 為滿足觀眾視聽至高無上的享受，台北信義威秀影城應用最新科技，為未來影城之設計規劃建立新規範，也為台灣的電影院史上樹立新的里程碑。出自名室內設計師之手的17間影廳院，皆具備超大型廣角弧形銀幕及球場座位排列的座椅，提供威秀影城之觀眾寬敞舒適、無障礙的空間。</p>
                <p class="middle_p intro">※本影城為方便消費者，亦設有無障礙空間。</p>
                <ul class="p_ul">
                    <li class="p_li">輪椅席(共40個席次)：第1、3-11、12廳-各3席，第2、13-16廳-各2席</li>
                    <li class="p_li">無障礙電梯：一樓手扶梯旁</li>
                    <li class="p_li">無障礙坡道：二樓第12廳前</li>
                    <li class="p_li">無障礙停車位：地下停車場二樓</li>
                    <li class="p_li">無障礙廁所</li>
                </ul>
                <p class="middle_p intro"></p>
                <p class="middle_p">台北市信義區松壽路20號</p>
            </section> -->
            <CinemaInformance></CinemaInformance>
        </section>
        <section class="head_right">
            <CinemaMap></CinemaMap>
        </section>
    </section>
</template>
    
<script setup>
    
    import CinemaRunFilter from './CinemaRunFilter.vue';
    import CinemaSubsTurn from './CinemaSubsTurn.vue';
    import CinemaInformance from './CinemaInformance.vue';
    import CinemaMap from './CinemaMap.vue';

</script>
    
<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    .cinemawrap{
        background-color: rgb(231, 228, 228);
        height: 650px;
        width: 100%;
        display: flex;
        padding-left: 120px;
        padding-right: 120px;
        padding-bottom: 50px;
    }
    .head_left{
        position: relative;
        flex: 0.9 1 200px ;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 10px 30px 10px;

    }
    .head_middle{
        flex: 1.4 1 350px ;
        padding: 50px 40px 50px 0px ; 
    }
    
    .head_right{
        flex: 0.7 1 400px ;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .image{
        height: 250px;
        margin-top: 20px;
    }
    .left_wrap{
        display: flex;
        padding: 20px;
        margin-top: 40px;
        align-items: center;
        
    }
</style>