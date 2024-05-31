import { ComputedRef, Ref, PropType } from 'vue';
interface Item {
    value: number;
    date: Date;
    selected: boolean | undefined;
    ref: Ref<null | HTMLElement>;
}
declare const _sfc_main: import("vue").DefineComponent<{
    selected: {
        type: PropType<Date>;
        required: false;
    };
    pageDate: {
        type: PropType<Date>;
        required: true;
    };
    visible: {
        type: BooleanConstructor;
        required: true;
    };
    disabledTime: {
        type: PropType<{
            dates?: Date[] | undefined;
            predicate?: ((target: Date) => boolean) | undefined;
        }>;
        required: false;
    };
}, {
    hoursListRef: Ref<HTMLElement | null>;
    minutesListRef: Ref<HTMLElement | null>;
    hours: Ref<number>;
    minutes: Ref<number>;
    hoursList: ComputedRef<Item[]>;
    minutesList: ComputedRef<Item[]>;
    padStartZero: (item: number) => string;
    selectMinutes: (item: Item) => void;
    isEnabled: (target: Date) => boolean;
    scroll: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
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
    visible: {
        type: BooleanConstructor;
        required: true;
    };
    disabledTime: {
        type: PropType<{
            dates?: Date[] | undefined;
            predicate?: ((target: Date) => boolean) | undefined;
        }>;
        required: false;
    };
}>> & {
    onSelect?: ((date: Date) => any) | undefined;
    onBack?: (() => any) | undefined;
}, {}, {}>;
export default _sfc_main;
