/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { UserSession } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserSessionUpdateFormInputValues = {
    eliminated?: boolean;
    currentRoundResponse?: string;
    totalScore?: number;
    totalGames?: number;
    wins?: number;
    losses?: number;
    gameSessionID?: string;
    userPersistedDataID?: string;
};
export declare type UserSessionUpdateFormValidationValues = {
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
export declare type UserSessionUpdateFormOverridesProps = {
    UserSessionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    eliminated?: PrimitiveOverrideProps<SwitchFieldProps>;
    currentRoundResponse?: PrimitiveOverrideProps<TextFieldProps>;
    totalScore?: PrimitiveOverrideProps<TextFieldProps>;
    totalGames?: PrimitiveOverrideProps<TextFieldProps>;
    wins?: PrimitiveOverrideProps<TextFieldProps>;
    losses?: PrimitiveOverrideProps<TextFieldProps>;
    gameSessionID?: PrimitiveOverrideProps<AutocompleteProps>;
    userPersistedDataID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type UserSessionUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserSessionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userSession?: UserSession;
    onSubmit?: (fields: UserSessionUpdateFormInputValues) => UserSessionUpdateFormInputValues;
    onSuccess?: (fields: UserSessionUpdateFormInputValues) => void;
    onError?: (fields: UserSessionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserSessionUpdateFormInputValues) => UserSessionUpdateFormInputValues;
    onValidate?: UserSessionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserSessionUpdateForm(props: UserSessionUpdateFormProps): React.ReactElement;
