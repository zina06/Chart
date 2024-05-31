import { PropType } from 'vue';
import { Item } from './PickerPopup.vue';
declare const _sfc_main: import("vue").DefineComponent<{
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
    headingFormat: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    weekdayFormat: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    locale: {
        type: PropType<Locale>;
        required: false;
    };
    weekStartsOn: {
        type: PropType<0 | 1 | 2 | 3 | 4 | 5 | 6>;
        required: false;
        default: number;
        validator: (i: unknown) => boolean;
    };
    lowerLimit: {
        type: PropType<Date>;
        required: false;
    };
    upperLimit: {
        type: PropType<Date>;
        required: false;
    };
    disabledDates: {
        type: PropType<{
            dates?: Date[] | undefined;
            predicate?: ((target: Date) => boolean) | undefined;
        }>;
        required: false;
    };
    allowOutsideInterval: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    weekDays: import("vue").ComputedRef<string[]>;
    days: import("vue").ComputedRef<Item[]>;
    heading: import("vue").ComputedRef<string>;
    leftDisabled: import("vue").ComputedRef<boolean | undefined>;
    rightDisabled: import("vue").ComputedRef<boolean | undefined>;
    previousPage: () => void;
    nextPage: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    'update:pageDate': (date: Date) => boolean;
    select: (date: Date) => boolean;
    back: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
    headingFormat: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    weekdayFormat: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    locale: {
        type: PropType<Locale>;
        required: false;
    };
    weekStartsOn: {
        type: PropType<0 | 1 | 2 | 3 | 4 | 5 | 6>;
        required: false;
        default: number;
        validator: (i: unknown) => boolean;
    };
    lowerLimit: {
        type: PropType<Date>;
        required: false;
    };
    upperLimit: {
        type: PropType<Date>;
        required: false;
    };
    disabledDates: {
        type: PropType<{
            dates?: Date[] | undefined;
            predicate?: ((target: Date) => boolean) | undefined;
        }>;
        required: false;
    };
    allowOutsideInterval: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>> & {
    "onUpdate:pageDate"?: ((date: Date) => any) | undefined;
    onSelect?: ((date: Date) => any) | undefined;
    onBack?: (() => any) | undefined;
}, {
    allowOutsideInterval: boolean;
    weekdayFormat: string;
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    format: string;
    headingFormat: string;
}, {}>;
export default _sfc_main;
