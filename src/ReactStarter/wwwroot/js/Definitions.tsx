export class ColorName {
    public static White: string = "#FFFFFF";
    public static Gray: string = "#A3A3A3";
}

export enum AnimationType {
    SlideFromTop = 1,
    FadeIn = 2
}

export enum SortDirection {
    Ascending = 1,
    Descending = 2
}

export enum FilterOperation {
    Equals = 1,
    NotEquals = 2,
    Contains = 3,
    GreaterThan = 4,
    LessThan = 5,
    GreaterThanOrEqualTo = 6,
    LessThanOrEqualTo = 7,
    Any = 8
}