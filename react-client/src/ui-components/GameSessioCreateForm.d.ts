/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GameSessioCreateFormInputValues = {};
export declare type GameSessioCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GameSessioCreateFormOverridesProps = {
    GameSessioCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type GameSessioCreateFormProps = React.PropsWithChildren<{
    overrides?: GameSessioCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GameSessioCreateFormInputValues) => GameSessioCreateFormInputValues;
    onSuccess?: (fields: GameSessioCreateFormInputValues) => void;
    onError?: (fields: GameSessioCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GameSessioCreateFormInputValues) => GameSessioCreateFormInputValues;
    onValidate?: GameSessioCreateFormValidationValues;
} & React.CSSProperties>;
export default function GameSessioCreateForm(props: GameSessioCreateFormProps): React.ReactElement;
