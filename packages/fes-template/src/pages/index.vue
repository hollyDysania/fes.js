<template>
    <div class="page">
        home
        <FButton class="m-2">Button</FButton>
    </div>
</template>

<script>
import { FButton } from '@fesjs/fes-design';

export default {
    components: {
        FButton
    },
    setup() {
        return {
        };
    }
};
</script>

<style>
.page {
}
</style>

<config>
{
    "name": "index",
    "title": "$home"
}
</config>
