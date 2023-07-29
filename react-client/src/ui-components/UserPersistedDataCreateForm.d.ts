/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { UserSession } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserPersistedDataCreateFormInputValues = {
    _ttl?: number;
    username?: string;
    totalScore?: number;
    totalGames?: number;
    wins?: number;
    losses?: number;
    rank?: number;
    UserSessions?: UserSession[];
};
export declare type UserPersistedDataCreateFormValidationValues = {
    _ttl?: ValidationFunction<number>;
    username?: ValidationFunction<string>;
    totalScore?: ValidationFunction<number>;
    totalGames?: ValidationFunction<number>;
    wins?: ValidationFunction<number>;
    losses?: ValidationFunction<number>;
    rank?: ValidationFunction<number>;
    UserSessions?: ValidationFunction<UserSession>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserPersistedDataCreateFormOverridesProps = {
    UserPersistedDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    _ttl?: PrimitiveOverrideProps<TextFieldProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    totalScore?: PrimitiveOverrideProps<TextFieldProps>;
    totalGames?: PrimitiveOverrideProps<TextFieldProps>;
    wins?: PrimitiveOverrideProps<TextFieldProps>;
    losses?: PrimitiveOverrideProps<TextFieldProps>;
    rank?: PrimitiveOverrideProps<TextFieldProps>;
    UserSessions?: PrimitiveOverrideProps<AutocompleteProps>;
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
