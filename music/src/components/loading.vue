<template>
    <div class="loading" v-if="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true
        }
    },
    watch: {
        isLoading(status) {
            this.loading = status;
        }
    },
    computed: {
        isLoading() {
            return this.$store.state.loading;
        }
    }
}
</script>

<style lang="less">
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 5rem;
        z-index: 67777;
        transform: translate(-50%, -50%);
    }
    .loading::after {
        display: block;
        content: '';
        clear: both;
    }
.loading span {
	display: block;
	background-color: rgb(252, 162, 162);
	width: .3rem;
	height: 10%;
	border-radius: 14px;
	margin-right: .3rem;
	float: left;
	margin-top: 25%;
}
.loading span:last-child {
	margin-right: 0px;
}
.loading span:nth-child(1) {
 animation: load 2.5s 1.4s infinite linear;
}
.loading span:nth-child(2) {
 animation: load 2.5s 1.2s infinite linear;
}
.loading span:nth-child(3) {
 animation: load 2.5s 1s infinite linear;
}
.loading span:nth-child(4) {
 animation: load 2.5s 0.8s infinite linear;
}
.loading span:nth-child(5) {
 animation: load 2.5s 0.6s infinite linear;
}
.loading span:nth-child(6) {
 animation: load 2.5s 0.4s infinite linear;
}
.loading span:nth-child(7) {
 animation: load 2.5s 0.2s infinite linear;
}
.loading span:nth-child(8) {
 animation: load 2.5s 0s infinite linear;
}
.loading span:nth-child(9) {
 animation: load 2.5s 0.2s infinite linear;
}
.loading span:nth-child(10) {
 animation: load 2.5s 0.4s infinite linear;
}
.loading span:nth-child(11) {
 animation: load 2.5s 0.6s infinite linear;
}
.loading span:nth-child(12) {
 animation: load 2.5s 0.8s infinite linear;
}
.loading span:nth-child(13) {
 animation: load 2.5s 1s infinite linear;
}
.loading span:nth-child(14) {
 animation: load 2.5s 1.2s infinite linear;
}
.loading span:nth-child(15) {
 animation: load 2.5s 1.4s infinite linear;
}
@keyframes load {
 0% {
 background: rgb(252, 162, 162);
 margin-top: 25%;
 height: 10%;
}
 50% {
 background: rgb(247, 16, 16);
 height: 100%;
 margin-top: 0%;
}
 100% {
 background: rgb(252, 162, 162);
 height: 10%;
 margin-top: 25%;
}
}
</style>