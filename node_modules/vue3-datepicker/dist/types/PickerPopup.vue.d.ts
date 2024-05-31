import { PropType } from 'vue';
export interface Item {
    key: string;
    value: Date;
    display: number | string;
    disabled: boolean;
    selected: boolean;
    current?: boolean;
}
export type ViewMode = 'year' | 'month' | 'day' | 'time' | 'custom';
declare const _sfc_main: import("vue").DefineComponent<{
    headingClickable: {
        type: BooleanConstructor;
        default: boolean;
    };
    leftDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    rightDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    columnCount: {
        type: NumberConstructor;
        default: number;
    };
    items: {
        type: PropType<Item[]>;
        default: () => Item[];
    };
    viewMode: {
        type: PropType<ViewMode>;
        required: true;
        validate: (x: unknown) => boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    elementClick: (value: Date) => boolean;
    left: () => true;
    right: () => true;
    heading: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    headingClickable: {
        type: BooleanConstructor;
        default: boolean;
    };
    leftDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    rightDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    columnCount: {
        type: NumberConstructor;
        default: number;
    };
    items: {
        type: PropType<Item[]>;
        default: () => Item[];
    };
    viewMode: {
        type: PropType<ViewMode>;
        required: true;
        validate: (x: unknown) => boolean;
    };
}>> & {
    onHeading?: (() => any) | undefined;
    onElementClick?: ((value: Date) => any) | undefined;
    onLeft?: (() => any) | undefined;
    onRight?: (() => any) | undefined;
}, {
    leftDisabled: boolean;
    rightDisabled: boolean;
    headingClickable: boolean;
    columnCount: number;
    items: Item[];
}, {}>;
export default _sfc_main;
