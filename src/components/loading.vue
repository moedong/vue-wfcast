<template>
    <div class="mint-indicator">
        <div class="mint-indicator-wrapper">
            <span class="mint-indicator-spin">
                <div class="mint-spinner-snake" style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 32px; width: 32px;"></div>
            </span>
            <span class="mint-indicator-text">加载中...</span>
        </div>
        <div class="mint-indicator-mask"></div>
    </div>
</template>

<script>
    
</script>

<style>
.mint-spinner-snake {
    -webkit-animation:mint-spinner-rotate .8s infinite linear;
    animation:mint-spinner-rotate .8s infinite linear;
    border:4px solid transparent;
    border-radius:50%
}
@-webkit-keyframes mint-spinner-rotate {
    0% {
        -webkit-transform:rotate(0deg);
        transform:rotate(0deg)
    }
    to {
        -webkit-transform:rotate(1turn);
        transform:rotate(1turn)
    }
}
@keyframes mint-spinner-rotate {
    0% {
        -webkit-transform:rotate(0deg);
        transform:rotate(0deg)
    }
    to {
        -webkit-transform:rotate(1turn);
        transform:rotate(1turn)
    }
}

.mint-indicator {
    -webkit-transition:opacity .2s linear;
    transition:opacity .2s linear
}
.mint-indicator-wrapper {
    padding:20px 30px;
    top:50%;
    left:50%;
    position:fixed;
    -webkit-transform:translate(-50%,-50%);
    transform:translate(-50%,-50%);
    border-radius:5px;
    background:rgba(0,0,0,.7);
    color:#fff;
    box-sizing:border-box;
    text-align:center
}
.mint-indicator-text {
    display:block;
    color:#fff;
    text-align:center;
    margin-top:10px;
    font-size:16px
}
.mint-indicator-spin {
    display:inline-block;
    text-align:center
}
.mint-indicator-mask {
    top:0;
    left:0;
    position:fixed;
    width:100%;
    height:100%;
    opacity:0;
    background:transparent
}
.mint-indicator-enter,.mint-indicator-leave-active {
    opacity:0
}
.mint-msgbox {
    position:fixed;
    top:50%;
    left:50%;
    -webkit-transform:translate3d(-50%,-50%,0);
    transform:translate3d(-50%,-50%,0);
    background-color:#fff;
    width:85%;
    border-radius:3px;
    font-size:16px;
    -webkit-user-select:none;
    overflow:hidden;
    -webkit-backface-visibility:hidden;
    backface-visibility:hidden;
    -webkit-transition:.2s;
    transition:.2s
}
</style>