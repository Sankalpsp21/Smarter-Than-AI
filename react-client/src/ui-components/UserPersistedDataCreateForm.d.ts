/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserPersistedDataCreateFormInputValues = {
    totalScore?: number;
    totalGames?: number;
    wins?: number;
    losses?: number;
    rank?: number;
};
export declare type UserPersistedDataCreateFormValidationValues = {
    totalScore?: ValidationFunction<number>;
    totalGames?: ValidationFunction<number>;
    wins?: ValidationFunction<number>;
    losses?: ValidationFunction<number>;
    rank?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserPersistedDataCreateFormOverridesProps = {
    UserPersistedDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    totalScore?: PrimitiveOverrideProps<TextFieldProps>;
    totalGames?: PrimitiveOverrideProps<TextFieldProps>;
    wins?: PrimitiveOverrideProps<TextFieldProps>;
    losses?: PrimitiveOverrideProps<TextFieldProps>;
    rank?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserPersistedDataCreateFormProps = React.PropsWithChildren<{
    overrides?: UserPersistedDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserPersistedDataCreateFormInputValues) => UserPersistedDataCreateFormInputValues;
    onSuccess?: (fields: UserPersistedDataCreateFormInputValues) => void;
    onError?: (fields: UserPersistedDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserPersistedDataCreateFormInputValues) => UserPersistedDataCreateFormInputValues;
    onValidate?: UserPersistedDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserPersistedDataCreateForm(props: UserPersistedDataCreateFormProps): React.ReactElement;
