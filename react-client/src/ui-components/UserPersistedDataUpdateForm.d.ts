/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { UserPersistedData, UserSession } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserPersistedDataUpdateFormInputValues = {
    username?: string;
    totalScore?: number;
    totalGames?: number;
    wins?: number;
    losses?: number;
    rank?: number;
    UserSessions?: UserSession[];
};
export declare type UserPersistedDataUpdateFormValidationValues = {
    username?: ValidationFunction<string>;
    totalScore?: ValidationFunction<number>;
    totalGames?: ValidationFunction<number>;
    wins?: ValidationFunction<number>;
    losses?: ValidationFunction<number>;
    rank?: ValidationFunction<number>;
    UserSessions?: ValidationFunction<UserSession>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserPersistedDataUpdateFormOverridesProps = {
    UserPersistedDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    totalScore?: PrimitiveOverrideProps<TextFieldProps>;
    totalGames?: PrimitiveOverrideProps<TextFieldProps>;
    wins?: PrimitiveOverrideProps<TextFieldProps>;
    losses?: PrimitiveOverrideProps<TextFieldProps>;
    rank?: PrimitiveOverrideProps<TextFieldProps>;
    UserSessions?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type UserPersistedDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserPersistedDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userPersistedData?: UserPersistedData;
    onSubmit?: (fields: UserPersistedDataUpdateFormInputValues) => UserPersistedDataUpdateFormInputValues;
    onSuccess?: (fields: UserPersistedDataUpdateFormInputValues) => void;
    onError?: (fields: UserPersistedDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserPersistedDataUpdateFormInputValues) => UserPersistedDataUpdateFormInputValues;
    onValidate?: UserPersistedDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserPersistedDataUpdateForm(props: UserPersistedDataUpdateFormProps): React.ReactElement;
