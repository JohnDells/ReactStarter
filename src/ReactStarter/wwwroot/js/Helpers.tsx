import { AnimationType } from 'Definitions';

export const Helpers = {
    toSafeString: (value: number): string => {
        return value == null ? "" : value.toString();
    },
    toSafeNullableInt: (value: string): number => {
        const result = parseInt(value);
        if (isNaN(result)) {
            return null;
        }
        return result;
    },
    nullIfEmpty: (value: string): string => {
        return value === "" ? null : value;
    },
    getAnimationNameFromType(value: number): string {
        switch (value) {
            case AnimationType.SlideFromTop:
                return "animatetop";
            case AnimationType.FadeIn:
                return "fadein";
            default:
                return "animatetop";
        }
    }
};
