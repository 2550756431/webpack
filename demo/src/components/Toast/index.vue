<template>
    <div id="toast">
        <p :class="[type ? `toast-${type}` : '', size ? `toast-${size}` : '']">
            {{ message }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'toast',
    data() {
        return {
            //显示类型（success，info，warning，error），默认为info
            type: 'info',
            //显示大小（default，small，big），默认为default
            size: 'default',
            //显示文字内容
            message: '',
            //显示时间，默认为3000
            duration: 3000
        }
    },
    mounted() {
        //指定时间后销毁组件
        setTimeout(() => {
            this.$destroy(true)  //销毁组件
            this.$el.parentNode.removeChild(this.$el)  //父元素中移除dom元素（$el为组件实例）
        }, this.duration)
    }
}
</script>

<style lang='less' scoped>
    #toast {
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        p {
            border-radius: 4px;
        }
        .toast-success {
            background-color: #F0F9EB;
            color: #67C23A;
            border: 1px solid #E1F3D8;
        }
        .toast-info {
            background-color: #F4F4F5;
            color: #909399;
            border: 1px solid  #EBEEF5;
        }
        .toast-warning {
            background-color: #FDF6EC;
            color: #E6A23C;
            border: 1px solid #FAECD8;
        }
        .toast-error {
            background-color: #FEF0F0;
            color: #F56C6C;
            border: 1px solid #FDE2E2;
        }
        .toast-default {
            padding: 12px 35px;
            font-size: 16px;
        }
        .toast-small {
            padding: 10px 30px;
            font-size: 14px;
        }
        .toast-big {
            padding: 14px 40px;
            font-size: 18px;
        }
    }
</style>
