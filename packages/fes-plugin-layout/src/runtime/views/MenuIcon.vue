<script>
import { ref, onBeforeMount } from 'vue';
// eslint-disable-next-line import/extensions
import Icons from '../icons';
import { validateContent } from '../helpers/svg';

export default {
    props: {
        icon: [String, Object]
    },
    setup(props) {
        const AIcon = ref(null);
        const AText = ref(null);

        onBeforeMount(() => {
            if (props.icon && props.icon.type === 'icon') {
                AIcon.value = Icons[props.icon.name];
            } else {
                fetch(props.icon).then((rsp) => {
                    if (rsp.ok) {
                        return rsp.text().then((svgContent) => {
                            AText.value = validateContent(svgContent);
                        });
                    }
                });
            }
        });

        return () => {
            if (AIcon.value) {
                return <AIcon.value />;
            }
            if (AText.value) {
                return (
                    <span
                        class={'fes-layout-icon'}
                        innerHTML={AText.value}
                    ></span>
                );
            }
            return null;
        };
    }
};
</script>
<style>
.fes-layout-icon {
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    min-width: 14px;
    font-size: 14px;
}
</style>
