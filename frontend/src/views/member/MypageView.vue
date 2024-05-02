<template>
    <div class="mypage">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">내 정보</div>
                <div class="title-bar-controls">
                    <button aria-label="Help"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body">
                <menu role="tablist">
                    <li role="tab" aria-selected="true"><a href="#tabs">Desktop</a></li>
                    <li role="tab"><a href="#tabs">My computer</a></li>
                    <li role="tab"><a href="#tabs">Control panel</a></li>
                    <li role="tab"><a href="#tabs">Devices manager</a></li>
                    <li role="tab"><a href="#tabs">Hardware profiles</a></li>
                    <li role="tab"><a href="#tabs">Performance</a></li>
                </menu>
                <div class="window" role="tabpanel">
                    <div class="window-body">
                    <p>the tab content</p>
                    </div>
                </div>
                <div class="page-btn-div">
                    <button>확인</button>
                    <button class="cancel-btn">취소</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .mypage {
        background-color: #C3C2C3;
        height: 100vh;
        position: relative;
        z-index: 1;
    }

    .window {
        height: 100%;
        
    }

    .window-body {
        height: 60%;
    }

    .window-body > .window {
        height: 100%;
    }

    .page-btn-div {
        padding: 10px 0;
        display: flex;
        justify-content: flex-end;
    }

    .cancel-btn {
        margin-left: 5px;
    }
</style>