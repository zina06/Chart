import { PropType } from 'vue';
import { Item } from './PickerPopup.vue';
declare const _sfc_main: import("vue").DefineComponent<{
    /**
     * Currently selected date, needed for highlighting
     */
    selected: {
        type: PropType<Date>;
        required: false;
    };
    pageDate: {
        type: PropType<Date>;
        required: true;
    };
    format: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    locale: {
        type: PropType<Locale>;
        required: false;
    };
    lowerLimit: {
        type: PropType<Date>;
        required: false;
    };
    upperLimit: {
        type: PropType<Date>;
        required: false;
    };
}, {
    months: import("vue").ComputedRef<Item[]>;
    heading: import("vue").ComputedRef<number>;
    leftDisabled: import("vue").ComputedRef<boolean | undefined>;
    rightDisabled: import("vue").ComputedRef<boolean | undefined>;
    previousPage: () => void;
    nextPage: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    'update:pageDate': (date: Date) => boolean;
    select: (date: Date) => boolean;
    back: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Currently selected date, needed for highlighting
     */
    selected: {
        type: PropType<Date>;
        required: false;
    };
    pageDate: {
        type: PropType<Date>;
        required: true;
    };
    format: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    locale: {
        type: PropType<Locale>;
        required: false;
    };
    lowerLimit: {
        type: PropType<Date>;
        required: false;
    };
    upperLimit: {
        type: PropType<Date>;
        required: false;
    };
}>> & {
    "onUpdate:pageDate"?: ((date: Date) => any) | undefined;
    onSelect?: ((date: Date) => any) | undefined;
    onBack?: (() => any) | undefined;
}, {
    format: string;
}, {}>;
export default _sfc_main;
