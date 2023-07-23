/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { GameSession } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function GameSessionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    pinCode: "",
    playerCount: "",
    roundNumber: "",
    roundPrompt: "",
    currentRoundExpiration: "",
  };
  const [pinCode, setPinCode] = React.useState(initialValues.pinCode);
  const [playerCount, setPlayerCount] = React.useState(
    initialValues.playerCount
  );
  const [roundNumber, setRoundNumber] = React.useState(
    initialValues.roundNumber
  );
  const [roundPrompt, setRoundPrompt] = React.useState(
    initialValues.roundPrompt
  );
  const [currentRoundExpiration, setCurrentRoundExpiration] = React.useState(
    initialValues.currentRoundExpiration
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPinCode(initialValues.pinCode);
    setPlayerCount(initialValues.playerCount);
    setRoundNumber(initialValues.roundNumber);
    setRoundPrompt(initialValues.roundPrompt);
    setCurrentRoundExpiration(initialValues.currentRoundExpiration);
    setErrors({});
  };
  const validations = {
    pinCode: [{ type: "Required" }],
    playerCount: [{ type: "Required" }],
    roundNumber: [{ type: "Required" }],
    roundPrompt: [{ type: "Required" }],
    currentRoundExpiration: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          pinCode,
          playerCount,
          roundNumber,
          roundPrompt,
          currentRoundExpiration,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new GameSession(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "GameSessionCreateForm")}
      {...rest}
    >
      <TextField
        label="Pin code"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={pinCode}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              pinCode: value,
              playerCount,
              roundNumber,
              roundPrompt,
              currentRoundExpiration,
            };
            const result = onChange(modelFields);
            value = result?.pinCode ?? value;
          }
          if (errors.pinCode?.hasError) {
            runValidationTasks("pinCode", value);
          }
          setPinCode(value);
        }}
        onBlur={() => runValidationTasks("pinCode", pinCode)}
        errorMessage={errors.pinCode?.errorMessage}
        hasError={errors.pinCode?.hasError}
        {...getOverrideProps(overrides, "pinCode")}
      ></TextField>
      <TextField
        label="Player count"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={playerCount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              pinCode,
              playerCount: value,
              roundNumber,
              roundPrompt,
              currentRoundExpiration,
            };
            const result = onChange(modelFields);
            value = result?.playerCount ?? value;
          }
          if (errors.playerCount?.hasError) {
            runValidationTasks("playerCount", value);
          }
          setPlayerCount(value);
        }}
        onBlur={() => runValidationTasks("playerCount", playerCount)}
        errorMessage={errors.playerCount?.errorMessage}
        hasError={errors.playerCount?.hasError}
        {...getOverrideProps(overrides, "playerCount")}
      ></TextField>
      <TextField
        label="Round number"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={roundNumber}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              pinCode,
              playerCount,
              roundNumber: value,
              roundPrompt,
              currentRoundExpiration,
            };
            const result = onChange(modelFields);
            value = result?.roundNumber ?? value;
          }
          if (errors.roundNumber?.hasError) {
            runValidationTasks("roundNumber", value);
          }
          setRoundNumber(value);
        }}
        onBlur={() => runValidationTasks("roundNumber", roundNumber)}
        errorMessage={errors.roundNumber?.errorMessage}
        hasError={errors.roundNumber?.hasError}
        {...getOverrideProps(overrides, "roundNumber")}
      ></TextField>
      <TextField
        label="Round prompt"
        isRequired={true}
        isReadOnly={false}
        value={roundPrompt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pinCode,
              playerCount,
              roundNumber,
              roundPrompt: value,
              currentRoundExpiration,
            };
            const result = onChange(modelFields);
            value = result?.roundPrompt ?? value;
          }
          if (errors.roundPrompt?.hasError) {
            runValidationTasks("roundPrompt", value);
          }
          setRoundPrompt(value);
        }}
        onBlur={() => runValidationTasks("roundPrompt", roundPrompt)}
        errorMessage={errors.roundPrompt?.errorMessage}
        hasError={errors.roundPrompt?.hasError}
        {...getOverrideProps(overrides, "roundPrompt")}
      ></TextField>
      <TextField
        label="Current round expiration"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={
          currentRoundExpiration &&
          convertToLocal(new Date(currentRoundExpiration))
        }
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              pinCode,
              playerCount,
              roundNumber,
              roundPrompt,
              currentRoundExpiration: value,
            };
            const result = onChange(modelFields);
            value = result?.currentRoundExpiration ?? value;
          }
          if (errors.currentRoundExpiration?.hasError) {
            runValidationTasks("currentRoundExpiration", value);
          }
          setCurrentRoundExpiration(value);
        }}
        onBlur={() =>
          runValidationTasks("currentRoundExpiration", currentRoundExpiration)
        }
        errorMessage={errors.currentRoundExpiration?.errorMessage}
        hasError={errors.currentRoundExpiration?.hasError}
        {...getOverrideProps(overrides, "currentRoundExpiration")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
