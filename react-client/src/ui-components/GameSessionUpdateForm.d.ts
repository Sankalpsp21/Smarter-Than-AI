/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GameSession, UserSession } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GameSessionUpdateFormInputValues = {
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
export declare type GameSessionUpdateFormValidationValues = {
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
export declare type GameSessionUpdateFormOverridesProps = {
    GameSessionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type GameSessionUpdateFormProps = React.PropsWithChildren<{
    overrides?: GameSessionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    gameSession?: GameSession;
    onSubmit?: (fields: GameSessionUpdateFormInputValues) => GameSessionUpdateFormInputValues;
    onSuccess?: (fields: GameSessionUpdateFormInputValues) => void;
    onError?: (fields: GameSessionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GameSessionUpdateFormInputValues) => GameSessionUpdateFormInputValues;
    onValidate?: GameSessionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GameSessionUpdateForm(props: GameSessionUpdateFormProps): React.ReactElement;
