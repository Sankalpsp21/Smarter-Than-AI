/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { UserSession } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GameSessionCreateFormInputValues = {
    _ttl?: number;
    pinCode?: number;
    playerCount?: number;
    roundNumber?: number;
    roundPrompt?: string;
    currentRoundExpiration?: string;
    UserSessions?: UserSession[];
    playersResponded?: number;
    roundMode?: string;
    aiResponse?: string;
};
export declare type GameSessionCreateFormValidationValues = {
    _ttl?: ValidationFunction<number>;
    pinCode?: ValidationFunction<number>;
    playerCount?: ValidationFunction<number>;
    roundNumber?: ValidationFunction<number>;
    roundPrompt?: ValidationFunction<string>;
    currentRoundExpiration?: ValidationFunction<string>;
    UserSessions?: ValidationFunction<UserSession>;
    playersResponded?: ValidationFunction<number>;
    roundMode?: ValidationFunction<string>;
    aiResponse?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GameSessionCreateFormOverridesProps = {
    GameSessionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    _ttl?: PrimitiveOverrideProps<TextFieldProps>;
    pinCode?: PrimitiveOverrideProps<TextFieldProps>;
    playerCount?: PrimitiveOverrideProps<TextFieldProps>;
    roundNumber?: PrimitiveOverrideProps<TextFieldProps>;
    roundPrompt?: PrimitiveOverrideProps<TextFieldProps>;
    currentRoundExpiration?: PrimitiveOverrideProps<TextFieldProps>;
    UserSessions?: PrimitiveOverrideProps<AutocompleteProps>;
    playersResponded?: PrimitiveOverrideProps<TextFieldProps>;
    roundMode?: PrimitiveOverrideProps<SelectFieldProps>;
    aiResponse?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GameSessionCreateFormProps = React.PropsWithChildren<{
    overrides?: GameSessionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GameSessionCreateFormInputValues) => GameSessionCreateFormInputValues;
    onSuccess?: (fields: GameSessionCreateFormInputValues) => void;
    onError?: (fields: GameSessionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GameSessionCreateFormInputValues) => GameSessionCreateFormInputValues;
    onValidate?: GameSessionCreateFormValidationValues;
} & React.CSSProperties>;
export default function GameSessionCreateForm(props: GameSessionCreateFormProps): React.ReactElement;
