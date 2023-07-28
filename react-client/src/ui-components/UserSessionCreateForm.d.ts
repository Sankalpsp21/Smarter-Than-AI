/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserSessionCreateFormInputValues = {
    eliminated?: boolean;
    currentRoundResponse?: string;
    totalScore?: number;
    totalGames?: number;
    wins?: number;
    losses?: number;
    gameSessionID?: string;
    userPersistedDataID?: string;
};
export declare type UserSessionCreateFormValidationValues = {
    eliminated?: ValidationFunction<boolean>;
    currentRoundResponse?: ValidationFunction<string>;
    totalScore?: ValidationFunction<number>;
    totalGames?: ValidationFunction<number>;
    wins?: ValidationFunction<number>;
    losses?: ValidationFunction<number>;
    gameSessionID?: ValidationFunction<string>;
    userPersistedDataID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserSessionCreateFormOverridesProps = {
    UserSessionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    eliminated?: PrimitiveOverrideProps<SwitchFieldProps>;
    currentRoundResponse?: PrimitiveOverrideProps<TextFieldProps>;
    totalScore?: PrimitiveOverrideProps<TextFieldProps>;
    totalGames?: PrimitiveOverrideProps<TextFieldProps>;
    wins?: PrimitiveOverrideProps<TextFieldProps>;
    losses?: PrimitiveOverrideProps<TextFieldProps>;
    gameSessionID?: PrimitiveOverrideProps<AutocompleteProps>;
    userPersistedDataID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type UserSessionCreateFormProps = React.PropsWithChildren<{
    overrides?: UserSessionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserSessionCreateFormInputValues) => UserSessionCreateFormInputValues;
    onSuccess?: (fields: UserSessionCreateFormInputValues) => void;
    onError?: (fields: UserSessionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserSessionCreateFormInputValues) => UserSessionCreateFormInputValues;
    onValidate?: UserSessionCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserSessionCreateForm(props: UserSessionCreateFormProps): React.ReactElement;
